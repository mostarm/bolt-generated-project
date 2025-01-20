import { useState } from 'react';
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
  Grid,
  LinearProgress
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RoomIcon from '@mui/icons-material/Room';
import { speakers } from '../data/speakers';

function TalkCard({ talk, isCurrentTalk, onClick, isFavorite, onToggleFavorite }) {
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onToggleFavorite(talk.id);
  };

  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        backgroundColor: isCurrentTalk ? 'rgba(0, 174, 239, 0.1)' : 'background.paper',
        '&:hover': {
          backgroundColor: isCurrentTalk ? 'rgba(0, 174, 239, 0.15)' : 'action.hover',
          transform: 'translateY(-2px)',
          boxShadow: '0 6px 12px rgba(0, 174, 239, 0.15)',
        },
        transition: 'all 0.3s ease',
        position: 'relative',
      }}
      onClick={onClick}
    >
      <Box sx={{ p: 2, flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Stack spacing={1} sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ 
              color: 'text.primary',
              fontSize: '1.1rem',
              lineHeight: 1.3,
              mb: 1
            }}>
              {talk.title}
            </Typography>
          </Stack>
          <IconButton 
            onClick={handleFavoriteClick}
            sx={{ 
              color: isFavorite ? 'primary.main' : 'text.secondary',
              padding: '4px'
            }}
          >
            {isFavorite ? <StarIcon fontSize="small" /> : <StarBorderIcon fontSize="small" />}
          </IconButton>
        </Box>

        <Stack spacing={2} sx={{ mt: 'auto' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AccessTimeIcon fontSize="small" sx={{ color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {talk.time}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mx: 1 }}>•</Typography>
            <RoomIcon fontSize="small" sx={{ color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {talk.room}
            </Typography>
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
        </Stack>

        {isCurrentTalk && (
          <Box sx={{ mt: 2 }}>
            <LinearProgress 
              variant="determinate" 
              value={70}
              sx={{
                height: 4,
                borderRadius: 2,
                backgroundColor: 'rgba(0, 174, 239, 0.2)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: '#00AEEF',
                  borderRadius: 2,
                }
              }}
            />
          </Box>
        )}
      </Box>
    </Card>
  );
}

export default function Agenda() {
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedTalk, setSelectedTalk] = useState(null);

  const conferenceDays = [...new Set(agenda.map(talk => talk.date))].sort();

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
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
      <Box sx={{ mb: 3 }}>
        <Tabs 
          value={selectedDay} 
          onChange={(_, newValue) => setSelectedDay(newValue)}
          variant="fullWidth"
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
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
        <FormControlLabel
          control={
            <Switch
              checked={showFavorites}
              onChange={(e) => setShowFavorites(e.target.checked)}
            />
          }
          label="Show Favorites Only"
          sx={{ color: 'text.secondary' }}
        />
      </Box>

      <Grid container spacing={2}>
        {filteredAgenda.map(talk => (
          <Grid item xs={12} sm={6} key={talk.id}>
            <TalkCard
              talk={talk}
              isCurrentTalk={false}
              onClick={() => setSelectedTalk(talk)}
              isFavorite={favorites.includes(talk.id)}
              onToggleFavorite={toggleFavorite}
            />
          </Grid>
        ))}
      </Grid>

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
                onClick={() => toggleFavorite(selectedTalk.id)}
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
