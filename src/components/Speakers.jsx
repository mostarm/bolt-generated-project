import { useState } from 'react';
import { 
  Box, 
  Card, 
  Typography, 
  Avatar, 
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Stack,
  Chip,
  Divider,
  Link,
  Button
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import RoomIcon from '@mui/icons-material/Room';
import { speakers } from '../data/speakers';

export default function Speakers() {
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);

  const handleSpeakerClick = (speaker) => {
    setSelectedSpeaker(speaker);
  };

  const handleClose = () => {
    setSelectedSpeaker(null);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Stack spacing={2}>
        {speakers.map(speaker => (
          <Card 
            key={speaker.id}
            sx={{ 
              p: 2, 
              cursor: 'pointer',
              '&:hover': { bgcolor: 'action.hover' }
            }}
            onClick={() => handleSpeakerClick(speaker)}
          >
            <Stack direction="row" spacing={2} alignItems="center">
              <Avatar 
                src={speaker.image}
                sx={{ width: 60, height: 60 }}
              />
              <Box>
                <Typography variant="h6">{speaker.name}</Typography>
                <Typography color="text.secondary" variant="body2">
                  {speaker.title}
                </Typography>
                <Chip 
                  label={`${speaker.talks.length} ${speaker.talks.length === 1 ? 'Talk' : 'Talks'}`}
                  size="small"
                  sx={{ mt: 1 }}
                />
              </Box>
            </Stack>
          </Card>
        ))}
      </Stack>

      <Dialog 
        open={Boolean(selectedSpeaker)} 
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        {selectedSpeaker && (
          <>
            <DialogTitle>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">Speaker Profile</Typography>
                <IconButton onClick={handleClose} color="inherit">
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Stack spacing={3}>
                {/* Speaker Header */}
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <Avatar 
                    src={selectedSpeaker.image}
                    sx={{ width: 100, height: 100 }}
                  />
                  <Box>
                    <Typography variant="h5">{selectedSpeaker.name}</Typography>
                    <Typography color="text.secondary" gutterBottom>
                      {selectedSpeaker.title}
                    </Typography>
                    
                    {/* Contact Buttons */}
                    <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                      {selectedSpeaker.social?.linkedin && (
                        <IconButton 
                          color="primary" 
                          component={Link} 
                          href={`https://linkedin.com/in/${selectedSpeaker.social.linkedin}`}
                          target="_blank"
                          size="small"
                        >
                          <LinkedInIcon />
                        </IconButton>
                      )}
                      {selectedSpeaker.social?.twitter && (
                        <IconButton 
                          color="primary"
                          component={Link}
                          href={`https://twitter.com/${selectedSpeaker.social.twitter}`}
                          target="_blank"
                          size="small"
                        >
                          <TwitterIcon />
                        </IconButton>
                      )}
                      {selectedSpeaker.email && (
                        <IconButton 
                          color="primary"
                          component={Link}
                          href={`mailto:${selectedSpeaker.email}`}
                          size="small"
                        >
                          <EmailIcon />
                        </IconButton>
                      )}
                    </Stack>
                  </Box>
                </Stack>

                <Divider />

                {/* Bio */}
                <Box>
                  <Typography variant="h6" gutterBottom>About</Typography>
                  <Typography color="text.secondary">
                    {selectedSpeaker.bio}
                  </Typography>
                </Box>

                <Divider />

                {/* Contact Information */}
                <Box>
                  <Typography variant="h6" gutterBottom>Contact Information</Typography>
                  <Stack spacing={1}>
                    {selectedSpeaker.email && (
                      <Button
                        startIcon={<EmailIcon />}
                        variant="outlined"
                        fullWidth
                        href={`mailto:${selectedSpeaker.email}`}
                        sx={{ justifyContent: 'flex-start' }}
                      >
                        {selectedSpeaker.email}
                      </Button>
                    )}
                    {selectedSpeaker.social?.linkedin && (
                      <Button
                        startIcon={<LinkedInIcon />}
                        variant="outlined"
                        fullWidth
                        href={`https://linkedin.com/in/${selectedSpeaker.social.linkedin}`}
                        target="_blank"
                        sx={{ justifyContent: 'flex-start' }}
                      >
                        LinkedIn Profile
                      </Button>
                    )}
                    {selectedSpeaker.social?.twitter && (
                      <Button
                        startIcon={<TwitterIcon />}
                        variant="outlined"
                        fullWidth
                        href={`https://twitter.com/${selectedSpeaker.social.twitter}`}
                        target="_blank"
                        sx={{ justifyContent: 'flex-start' }}
                      >
                        @{selectedSpeaker.social.twitter}
                      </Button>
                    )}
                  </Stack>
                </Box>

                <Divider />

                {/* Talks */}
                <Box>
                  <Typography variant="h6" gutterBottom>Sessions</Typography>
                  <Stack spacing={2}>
                    {selectedSpeaker.talks.map(talk => (
                      <Card key={talk.id} sx={{ p: 2 }}>
                        <Typography variant="subtitle1" gutterBottom>
                          {talk.title}
                        </Typography>
                        <Stack direction="row" spacing={2} color="text.secondary">
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <CalendarTodayIcon fontSize="small" />
                            <Typography variant="body2">{talk.time}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <RoomIcon fontSize="small" />
                            <Typography variant="body2">{talk.room}</Typography>
                          </Box>
                        </Stack>
                      </Card>
                    ))}
                  </Stack>
                </Box>
              </Stack>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
}
