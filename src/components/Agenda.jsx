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
  Divider
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import RoomIcon from '@mui/icons-material/Room';
import PersonIcon from '@mui/icons-material/Person';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { format } from 'date-fns';
import { speakers } from '../data/speakers';

export default function Agenda() {
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedSession, setSelectedSession] = useState(null);

  const conferenceDays = [...new Set(agenda.map(talk => talk.date))].sort();

  const toggleFavorite = (event, id) => {
    event.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  const filteredAgenda = agenda
    .filter(talk => talk.date === conferenceDays[selectedDay])
    .filter(talk => !showFavorites || favorites.includes(talk.id))
    .sort((a, b) => a.time.localeCompare(b.time));

  const formatDate = (dateString) => {
    return format(new Date(dateString), 'EEE, MMM d');
  };

  const getSpeakerDetails = (speakerName) => {
    return speakers.find(s => s.name === speakerName);
  };

  const handleSessionClick = (session) => {
    setSelectedSession({
      ...session,
      speakerDetails: getSpeakerDetails(session.speaker)
    });
  };

  return (
    <Box sx={{ p: 2 }}>
      <Tabs 
        value={selectedDay} 
        onChange={(_, newValue) => setSelectedDay(newValue)}
        variant="fullWidth"
        sx={{ mb: 3 }}
      >
        {conferenceDays.map((date, index) => (
          <Tab key={date} label={`Day ${index + 1}`} />
        ))}
      </Tabs>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" color="primary">
          {formatDate(conferenceDays[selectedDay])}
        </Typography>
      </Box>

      <FormControlLabel
        control={
          <Switch
            checked={showFavorites}
            onChange={(e) => setShowFavorites(e.target.checked)}
          />
        }
        label="Show Favorites Only"
        sx={{ mb: 2 }}
      />
      
      {filteredAgenda.map(talk => (
        <Card 
          key={talk.id} 
          sx={{ 
            mb: 2, 
            p: 2, 
            cursor: 'pointer',
            '&:hover': {
              bgcolor: 'action.hover',
              transition: 'background-color 0.2s'
            }
          }}
          onClick={() => handleSessionClick(talk)}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box>
              <Typography variant="h6">{talk.title}</Typography>
              <Typography>{talk.speaker}</Typography>
              <Typography color="text.secondary">{talk.time} - {talk.room}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {talk.abstract}
              </Typography>
            </Box>
            <IconButton 
              onClick={(e) => toggleFavorite(e, talk.id)}
              color="primary"
            >
              {favorites.includes(talk.id) ? <StarIcon /> : <StarBorderIcon />}
            </IconButton>
          </Box>
        </Card>
      ))}

      {filteredAgenda.length === 0 && (
        <Typography color="text.secondary" sx={{ textAlign: 'center', mt: 4 }}>
          No sessions found for this day
          {showFavorites && " in favorites"}
        </Typography>
      )}

      <Dialog 
        open={Boolean(selectedSession)} 
        onClose={() => setSelectedSession(null)}
        maxWidth="sm"
        fullWidth
      >
        {selectedSession && (
          <>
            <DialogTitle>
              <Typography variant="h5" gutterBottom>
                {selectedSession.title}
              </Typography>
              <Chip 
                icon={<LocalOfferIcon />} 
                label={selectedSession.track}
                size="small"
                color="primary"
                sx={{ mt: 1 }}
              />
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mb: 3 }}>
                {selectedSession.speakerDetails && (
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Avatar 
                      src={selectedSession.speakerDetails.image}
                      sx={{ width: 80, height: 80, mr: 2 }}
                    >
                      <PersonIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="h6">
                        {selectedSession.speakerDetails.name}
                      </Typography>
                      <Typography color="text.secondary">
                        {selectedSession.speakerDetails.title}
                      </Typography>
                    </Box>
                  </Box>
                )}

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <AccessTimeIcon color="action" />
                    <Typography>
                      {selectedSession.time} on {formatDate(selectedSession.date)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <RoomIcon color="action" />
                    <Typography>{selectedSession.room}</Typography>
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Typography variant="h6" gutterBottom>
                  About this Session
                </Typography>
                <Typography paragraph>
                  {selectedSession.abstract}
                </Typography>

                {selectedSession.speakerDetails?.bio && (
                  <>
                    <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                      About the Speaker
                    </Typography>
                    <Typography>
                      {selectedSession.speakerDetails.bio}
                    </Typography>
                  </>
                )}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setSelectedSession(null)}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}
