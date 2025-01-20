import { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Stack,
  IconButton,
  Link,
  Paper,
  Alert,
  Snackbar,
  Rating,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Chip,
} from '@mui/material';
import {
  Feedback,
  QrCode,
  Info,
  Security,
  ContactSupport,
  Help,
  DarkMode,
  NotificationsActive,
  Download,
  LinkedIn,
  Twitter,
  Facebook,
  Instagram,
  Email,
  LocationOn,
  Send,
} from '@mui/icons-material';
import QRCode from 'react-qr-code';
import { agenda } from '../data/agenda';

function More() {
  const [selectedSection, setSelectedSection] = useState(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [feedbackForm, setFeedbackForm] = useState({
    overallRating: 0,
    sessionQuality: '',
    venueRating: 0,
    comments: '',
    selectedTopics: []
  });

  const topics = [
    'Content Quality', 'Speaker Expertise', 'Event Organization',
    'Venue Facilities', 'Technical Setup', 'Networking Opportunities'
  ];

  const handleTopicToggle = (topic) => {
    setFeedbackForm(prev => ({
      ...prev,
      selectedTopics: prev.selectedTopics.includes(topic)
        ? prev.selectedTopics.filter(t => t !== topic)
        : [...prev.selectedTopics, topic]
    }));
  };

  const handleClose = () => {
    setSelectedSection(null);
  };

  const handleDownloadSchedule = () => {
    const scheduleData = {
      title: "QED Conference Schedule",
      dates: "February 15-17, 2024",
      events: agenda.map(talk => ({
        title: talk.title,
        speaker: talk.speaker,
        time: talk.time,
        room: talk.room,
        date: talk.date
      }))
    };

    const blob = new Blob([JSON.stringify(scheduleData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'qed-conference-schedule.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setSnackbarMessage('Schedule downloaded successfully!');
    setShowSnackbar(true);
  };

  const sections = {
    about: {
      title: 'About QED Conference',
      content: (
        <Stack spacing={3}>
          <Typography>
            QED Conference is the premier event for technology professionals, bringing together industry leaders, innovators, and practitioners to share knowledge and shape the future of technology.
          </Typography>
          
          <Box>
            <Typography variant="h6" gutterBottom>Venue</Typography>
            <Paper sx={{ p: 2, bgcolor: 'background.paper' }}>
              <Stack spacing={1}>
                <Typography variant="subtitle1">Tech Convention Center</Typography>
                <Typography variant="body2" color="text.secondary">
                  123 Innovation Street
                  <br />
                  San Francisco, CA 94105
                </Typography>
                <Button
                  startIcon={<LocationOn />}
                  variant="outlined"
                  size="small"
                  sx={{ mt: 1, width: 'fit-content' }}
                  component={Link}
                  href="https://maps.google.com"
                  target="_blank"
                >
                  View on Maps
                </Button>
              </Stack>
            </Paper>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom>Connect With Us</Typography>
            <Stack direction="row" spacing={1}>
              <IconButton color="primary" component={Link} href="https://linkedin.com" target="_blank">
                <LinkedIn />
              </IconButton>
              <IconButton color="primary" component={Link} href="https://twitter.com" target="_blank">
                <Twitter />
              </IconButton>
              <IconButton color="primary" component={Link} href="https://facebook.com" target="_blank">
                <Facebook />
              </IconButton>
              <IconButton color="primary" component={Link} href="https://instagram.com" target="_blank">
                <Instagram />
              </IconButton>
            </Stack>
          </Box>
        </Stack>
      )
    },
    feedback: {
      title: 'Conference Feedback',
      content: (
        <Stack spacing={4} sx={{ py: 2 }}>
          <Box>
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ 
                color: 'primary.main',
                fontWeight: 600,
                mb: 3
              }}
            >
              Help Us Improve
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>
              Your feedback is valuable in shaping future events. Please take a moment to share your thoughts.
            </Typography>
          </Box>

          <Paper 
            elevation={0} 
            sx={{ 
              p: 3, 
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 2
            }}
          >
            <Stack spacing={4}>
              <Box>
                <Typography 
                  variant="subtitle1" 
                  gutterBottom
                  sx={{ fontWeight: 500 }}
                >
                  Overall Experience
                </Typography>
                <Rating
                  value={feedbackForm.overallRating}
                  onChange={(_, value) => setFeedbackForm(prev => ({ ...prev, overallRating: value }))}
                  size="large"
                  sx={{
                    '& .MuiRating-iconFilled': {
                      color: 'primary.main',
                    },
                    '& .MuiRating-iconHover': {
                      color: 'primary.light',
                    }
                  }}
                />
              </Box>

              <Box>
                <Typography 
                  variant="subtitle1" 
                  gutterBottom
                  sx={{ fontWeight: 500 }}
                >
                  What aspects would you like to comment on?
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: 1,
                  '& > *': { margin: 0.5 }
                }}>
                  {topics.map((topic) => (
                    <Chip
                      key={topic}
                      label={topic}
                      onClick={() => handleTopicToggle(topic)}
                      color={feedbackForm.selectedTopics.includes(topic) ? 'primary' : 'default'}
                      variant={feedbackForm.selectedTopics.includes(topic) ? 'filled' : 'outlined'}
                      sx={{
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          transform: 'translateY(-2px)',
                          boxShadow: 2
                        }
                      }}
                    />
                  ))}
                </Box>
              </Box>

              <FormControl component="fieldset">
                <FormLabel 
                  component="legend"
                  sx={{ 
                    color: 'text.primary', 
                    '&.Mui-focused': { color: 'primary.main' }
                  }}
                >
                  How would you rate the session quality?
                </FormLabel>
                <RadioGroup
                  value={feedbackForm.sessionQuality}
                  onChange={(e) => setFeedbackForm(prev => ({ ...prev, sessionQuality: e.target.value }))}
                >
                  {['Excellent', 'Good', 'Average', 'Below Average'].map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio />}
                      label={option}
                      sx={{
                        '& .MuiRadio-root': {
                          color: 'primary.main',
                        }
                      }}
                    />
                  ))}
                </RadioGroup>
              </FormControl>

              <TextField
                multiline
                rows={4}
                variant="outlined"
                placeholder="Share your thoughts and suggestions..."
                value={feedbackForm.comments}
                onChange={(e) => setFeedbackForm(prev => ({ ...prev, comments: e.target.value }))}
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'divider',
                    },
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main',
                    }
                  }
                }}
              />

              <Button
                variant="contained"
                size="large"
                startIcon={<Send />}
                onClick={() => {
                  setSnackbarMessage('Thank you for your feedback!');
                  setShowSnackbar(true);
                  handleClose();
                }}
                sx={{
                  mt: 2,
                  py: 1.5,
                  bgcolor: 'primary.main',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                Submit Feedback
              </Button>
            </Stack>
          </Paper>
        </Stack>
      )
    },
    qrScanner: {
      title: 'Scan QR Code',
      content: (
        <Stack spacing={3} alignItems="center">
          <Typography variant="body1" color="text.secondary" textAlign="center">
            Show this QR code to mark your attendance at sessions
          </Typography>
          
          <Paper 
            sx={{ 
              p: 4, 
              bgcolor: 'white', 
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <QRCode 
              value="QED-CONF-2024-ATTENDEE-ID-123"
              size={200}
              level="H"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </Paper>

          <Typography variant="body2" color="text.secondary" textAlign="center">
            Your unique attendee QR code
          </Typography>

          <Button
            variant="contained"
            onClick={() => {
              setSnackbarMessage('QR Code saved to photos!');
              setShowSnackbar(true);
            }}
            startIcon={<Download />}
          >
            Save QR Code
          </Button>
        </Stack>
      )
    },
    help: {
      title: 'Help & Support',
      content: (
        <Stack spacing={3}>
          <Box>
            <Typography variant="h6" gutterBottom>Contact Information</Typography>
            <Stack spacing={2}>
              <Button startIcon={<Email />} variant="outlined" href="mailto:support@qedconf.com">
                support@qedconf.com
              </Button>
              <Button startIcon={<ContactSupport />} variant="outlined" href="tel:+1234567890">
                +1 (234) 567-890
              </Button>
            </Stack>
          </Box>
          
          <Box>
            <Typography variant="h6" gutterBottom>FAQ</Typography>
            <List>
              <ListItem>
                <ListItemText 
                  primary="Wi-Fi Access"
                  secondary="Network: QED-Conference | Password: QED2024"
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Session Recordings"
                  secondary="Available 24 hours after each session"
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Certificate of Attendance"
                  secondary="Downloadable from your profile after the event"
                />
              </ListItem>
            </List>
          </Box>
        </Stack>
      )
    },
    privacy: {
      title: 'Privacy Policy',
      content: (
        <Stack spacing={4}>
          <Typography variant="body1" color="text.secondary">
            Last updated: February 2024
          </Typography>

          <Box>
            <Typography variant="h6" gutterBottom color="primary.main">
              Data Collection
            </Typography>
            <Typography variant="body1" paragraph>
              We collect information that you provide directly to us, including:
            </Typography>
            <List>
              <ListItem>
                <ListItemText 
                  primary="Personal Information"
                  secondary="Name, email address, and professional details during registration"
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Attendance Data"
                  secondary="Session attendance and participation records via QR code scans"
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Feedback and Surveys"
                  secondary="Responses to conference feedback and session ratings"
                />
              </ListItem>
            </List>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom color="primary.main">
              How We Use Your Information
            </Typography>
            <List>
              <ListItem>
                <ListItemText 
                  primary="Event Management"
                  secondary="To manage your conference registration and attendance"
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Communications"
                  secondary="To send important updates about sessions and schedule changes"
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Improvements"
                  secondary="To enhance future events based on feedback and attendance patterns"
                />
              </ListItem>
            </List>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom color="primary.main">
              Data Security
            </Typography>
            <Typography variant="body1" paragraph>
              We implement appropriate security measures to protect your personal information:
            </Typography>
            <List>
              <ListItem>
                <ListItemText 
                  primary="Encryption"
                  secondary="All data is encrypted during transmission and storage"
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Access Controls"
                  secondary="Strict access controls and authentication measures"
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Regular Audits"
                  secondary="Periodic security assessments and updates"
                />
              </ListItem>
            </List>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom color="primary.main">
              Your Rights
            </Typography>
            <Typography variant="body1" paragraph>
              You have the right to:
            </Typography>
            <List>
              <ListItem>
                <ListItemText 
                  primary="Access"
                  secondary="Request a copy of your personal data"
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Correction"
                  secondary="Update or correct your personal information"
                />
              </ListItem>
              <ListItem>
                <ListItemText 
                  primary="Deletion"
                  secondary="Request deletion of your data after the event"
                />
              </ListItem>
            </List>
          </Box>

          <Box>
            <Typography variant="h6" gutterBottom color="primary.main">
              Contact Us
            </Typography>
            <Typography variant="body1">
              For privacy-related questions or concerns, contact our Data Protection Officer:
            </Typography>
            <Button
              startIcon={<Email />}
              variant="outlined"
              href="mailto:privacy@qedconf.com"
              sx={{ mt: 2 }}
            >
              privacy@qedconf.com
            </Button>
          </Box>
        </Stack>
      )
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <List>
        <ListItem>
          <ListItemIcon><NotificationsActive /></ListItemIcon>
          <ListItemText 
            primary="Push Notifications"
            secondary="Get updates about schedule changes and announcements"
          />
          <Switch
            edge="end"
            checked={notificationsEnabled}
            onChange={(e) => setNotificationsEnabled(e.target.checked)}
          />
        </ListItem>

        <ListItem>
          <ListItemIcon><DarkMode /></ListItemIcon>
          <ListItemText 
            primary="Dark Mode"
            secondary="Toggle dark/light theme"
          />
          <Switch
            edge="end"
            checked={darkMode}
            onChange={(e) => setDarkMode(e.target.checked)}
          />
        </ListItem>

        <Divider sx={{ my: 2 }} />

        <ListItemButton onClick={() => setSelectedSection('about')}>
          <ListItemIcon><Info /></ListItemIcon>
          <ListItemText primary="About the Conference" />
        </ListItemButton>

        <ListItemButton onClick={() => setSelectedSection('feedback')}>
          <ListItemIcon><Feedback /></ListItemIcon>
          <ListItemText primary="Provide Feedback" />
        </ListItemButton>

        <ListItemButton onClick={() => setSelectedSection('qrScanner')}>
          <ListItemIcon><QrCode /></ListItemIcon>
          <ListItemText primary="Scan QR Code" />
        </ListItemButton>

        <ListItemButton onClick={handleDownloadSchedule}>
          <ListItemIcon><Download /></ListItemIcon>
          <ListItemText primary="Download Schedule" />
        </ListItemButton>

        <Divider sx={{ my: 2 }} />

        <ListItemButton onClick={() => setSelectedSection('help')}>
          <ListItemIcon><Help /></ListItemIcon>
          <ListItemText primary="Help & Support" />
        </ListItemButton>

        <ListItemButton onClick={() => setSelectedSection('privacy')}>
          <ListItemIcon><Security /></ListItemIcon>
          <ListItemText primary="Privacy Policy" />
        </ListItemButton>
      </List>

      <Dialog
        open={Boolean(selectedSection)}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        {selectedSection && (
          <>
            <DialogTitle>{sections[selectedSection].title}</DialogTitle>
            <DialogContent>
              {sections[selectedSection].content}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={4000}
        onClose={() => setShowSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setShowSnackbar(false)} 
          severity="success" 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default More;
