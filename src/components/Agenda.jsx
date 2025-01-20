import { useState, useEffect } from 'react';
import { agenda } from '../data/agenda';
import { 
  Box, 
  Card, 
  Typography, 
  Switch, 
  FormControlLabel, 
  IconButton, 
  Tabs, 
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Chip,
  Avatar,
  Divider,
  Stack,
  LinearProgress
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RoomIcon from '@mui/icons-material/Room';
import PersonIcon from '@mui/icons-material/Person';
import { format, parseISO, addMinutes, differenceInMinutes, differenceInSeconds } from 'date-fns';
import { speakers } from '../data/speakers';

function TimeProgress({ startTime, duration }) {
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const updateProgress = () => {
      const now = new Date();
      const start = parseISO(startTime);
      const end = addMinutes(start, duration);

      // Calculate progress
      const totalDuration = duration * 60; // in seconds
      const elapsed = differenceInSeconds(now, start);
      const progressValue = (elapsed / totalDuration) * 100;
      
      // Calculate time left
      const minutesLeft = differenceInMinutes(end, now);
      
      if (minutesLeft > 0) {
        setTimeLeft(`${minutesLeft} min left`);
        setProgress(Math.min(progressValue, 100));
      } else {
        setTimeLeft('Ended');
        setProgress(100);
      }
    };

    updateProgress();
    const timer = setInterval(updateProgress, 1000);

    return () => clearInterval(timer);
  }, [startTime, duration]);

  return (
    <Box sx={{ width: '100%', mt: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
        <Typography variant="caption" color="primary">In Progress</Typography>
        <Typography variant="caption" color="primary">{timeLeft}</Typography>
      </Box>
      <LinearProgress 
        variant="determinate" 
        value={progress} 
        sx={{
          height: 6,
          borderRadius: 3,
          backgroundColor: 'rgba(0, 174, 239, 0.2)',
          '& .MuiLinearProgress-bar': {
            backgroundColor: '#00AEEF',
            borderRadius: 3,
          }
        }}
      />
    </Box>
  );
}

function TalkCard({ talk, isCurrentTalk, onClick }) {
  const [startTime, duration] = talk.time.split('-')[0].split(':').map(Number);
  const today = new Date();
  const talkDate = new Date(talk.date);
  const talkStartTime = new Date(
    talkDate.getFullYear(),
    talkDate.getMonth(),
    talkDate.getDate(),
    startTime,
    duration
  );

  const talkDuration = 90; // Assuming 90 minutes duration for each talk

  return (
    <Card 
      sx={{ 
        mb: 2, 
        p: 2,
        cursor: 'pointer',
        backgroundColor: isCurrentTalk ? 'rgba(0, 174, 239, 0.1)' : 'background.paper',
        '&:hover': {
          backgroundColor: isCurrentTalk ? 'rgba(0, 174, 239, 0.15)' : 'action.hover',
          transform: 'translateY(-2px)',
          boxShadow: '0 6px 12px rgba(0, 174, 239, 0.15)',
        },
        transition: 'all 0.3s ease',
      }}
      onClick={onClick}
    >
      <Stack spacing={1}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Stack spacing={0.5}>
            <Chip 
              label={talk.track}
              size="small"
              sx={{ 
                backgroundColor: 'rgba(0, 174, 239, 0.2)',
                color: '#00AEEF',
                fontWeight: 500,
                maxWidth: 'fit-content'
              }}
            />
            <Typography variant="h6" sx={{ color: 'text.primary' }}>
              {talk.title}
            </Typography>
          </Stack>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Avatar 
            src={speakers.find(s => s.name === talk.speaker)?.image}
            sx={{ width: 24, height: 24 }}
          />
          <Typography variant="body2" color="text.secondary">
            {talk.speaker}
          </Typography>
        </Box>

        <Stack direction="row" spacing={2} sx={{ color: 'text.secondary' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <AccessTimeIcon fontSize="small" />
            <Typography variant="body2">{talk.time}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <RoomIcon fontSize="small" />
            <Typography variant="body2">{talk.room}</Typography>
          </Box>
        </Stack>

        {isCurrentTalk && (
          <TimeProgress 
            startTime={talkStartTime.toISOString()} 
            duration={talkDuration}
          />
        )}
      </Stack>
    </Card>
  );
}

export default function Agenda() {
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedTalk, setSelectedTalk] = useState(null);

  const conferenceDays = [...new Set(agenda.map(talk => talk.date))].sort();

  const toggleFavorite = (event, id) => {
    event.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  const isCurrentTalk = (talk) => {
    const now = new Date();
    const [startHour, startMinute] = talk.time.split('-')[0].split(':').map(Number);
    const [endHour, endMinute] = talk.time.split('-')[1].split(':').map(Number);
    
    const talkDate = new Date(talk.date);
    const startTime = new Date(
      talkDate.getFullYear(),
      talkDate.getMonth(),
      talkDate.getDate(),
      startHour,
      startMinute
    );
    const endTime = new Date(
      talkDate.getFullYear(),
      talkDate.getMonth(),
      talkDate.getDate(),
      endHour,
      endMinute
    );

    return now >= startTime && now <= endTime;
  };

  const filteredAgenda = agenda
    .filter(talk => talk.date === conferenceDays[selectedDay])
    .filter(talk => !showFavorites || favorites.includes(talk.id))
    .sort((a, b) => {
      const timeA = a.time.split('-')[0];
      const timeB = b.time.split('-')[0];
      return timeA.localeCompare(timeB);
    });

  return (
    <Box sx={{ p: 2 }}>
      <Tabs 
        value={selectedDay} 
        onChange={(_, newValue) => setSelectedDay(newValue)}
        variant="fullWidth"
        sx={{ mb: 3 }}
      >
        {conferenceDays.map((date, index) => (
          <Tab 
            key={date} 
            label={`Day ${index + 1}`}
            sx={{
              '&.Mui-selected': {
                color: '#00AEEF',
              }
            }}
          />
        ))}
      </Tabs>

      <FormControlLabel
        control={
          <Switch
            checked={showFavorites}
            onChange={(e) => setShowFavorites(e.target.checked)}
          />
        }
        label="Show Favorites Only"
        sx={{ mb: 2, color: 'text.secondary' }}
      />
      
      {filteredAgenda.map(talk => (
        <TalkCard
          key={talk.id}
          talk={talk}
          isCurrentTalk={isCurrentTalk(talk)}
          onClick={() => setSelectedTalk(talk)}
        />
      ))}

      <Dialog 
        open={Boolean(selectedTalk)} 
        onClose={() => setSelectedTalk(null)}
        maxWidth="sm"
        fullWidth
      >
        {selectedTalk && (
          <>
            <DialogTitle>
              <Stack spacing={1}>
                <Chip 
                  label={selectedTalk.track}
                  size="small"
                  sx={{ 
                    backgroundColor: 'rgba(0, 174, 239, 0.2)',
                    color: '#00AEEF',
                    fontWeight: 500,
                    maxWidth: 'fit-content'
                  }}
                />
                <Typography variant="h6">{selectedTalk.title}</Typography>
              </Stack>
            </DialogTitle>
            <DialogContent>
              <Stack spacing={3}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar 
                    src={speakers.find(s => s.name === selectedTalk.speaker)?.image}
                    sx={{ width: 60, height: 60 }}
                  />
                  <Box>
                    <Typography variant="h6">{selectedTalk.speaker}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {speakers.find(s => s.name === selectedTalk.speaker)?.title}
                    </Typography>
                  </Box>
                </Box>

                <Divider />

                <Stack spacing={2}>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Time & Location
                    </Typography>
                    <Stack direction="row" spacing={3}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AccessTimeIcon color="primary" />
                        <Typography>{selectedTalk.time}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <RoomIcon color="primary" />
                        <Typography>{selectedTalk.room}</Typography>
                      </Box>
                    </Stack>
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      Abstract
                    </Typography>
                    <Typography>{selectedTalk.abstract}</Typography>
                  </Box>
                </Stack>
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setSelectedTalk(null)}>Close</Button>
              <Button 
                variant="contained" 
                onClick={(e) => toggleFavorite(e, selectedTalk.id)}
                startIcon={favorites.includes(selectedTalk.id) ? <StarIcon /> : <StarBorderIcon />}
              >
                {favorites.includes(selectedTalk.id) ? 'Remove from Favorites' : 'Add to Favorites'}
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}
