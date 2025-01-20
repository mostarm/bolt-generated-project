import { AppBar, Toolbar, Button, Box, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleIcon from '@mui/icons-material/People';
import BusinessIcon from '@mui/icons-material/Business';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

export default function Navigation() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <AppBar 
      position="fixed" 
      elevation={0}
      sx={{
        top: 0,
        borderBottom: '1px solid',
        borderColor: 'divider',
        bgcolor: 'background.paper',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            color: '#00AEEF',
            fontWeight: 600,
            cursor: 'pointer'
          }}
          onClick={() => navigate('/')}
        >
          QED
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            startIcon={<CalendarTodayIcon />}
            onClick={() => navigate('/')}
            sx={{
              color: isActive('/') ? '#00AEEF' : 'text.secondary',
              '&:hover': { color: '#00AEEF' },
            }}
          >
            Agenda
          </Button>

          <Button
            startIcon={<PeopleIcon />}
            onClick={() => navigate('/speakers')}
            sx={{
              color: isActive('/speakers') ? '#00AEEF' : 'text.secondary',
              '&:hover': { color: '#00AEEF' },
            }}
          >
            Speakers
          </Button>

          <Button
            startIcon={<BusinessIcon />}
            onClick={() => navigate('/sponsors')}
            sx={{
              color: isActive('/sponsors') ? '#00AEEF' : 'text.secondary',
              '&:hover': { color: '#00AEEF' },
            }}
          >
            Sponsors
          </Button>

          <Button
            startIcon={<NotificationsIcon />}
            onClick={() => navigate('/notifications')}
            sx={{
              color: isActive('/notifications') ? '#00AEEF' : 'text.secondary',
              '&:hover': { color: '#00AEEF' },
            }}
          >
            Notifications
          </Button>

          <Button
            startIcon={<MoreHorizIcon />}
            onClick={() => navigate('/more')}
            sx={{
              color: isActive('/more') ? '#00AEEF' : 'text.secondary',
              '&:hover': { color: '#00AEEF' },
            }}
          >
            More
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
