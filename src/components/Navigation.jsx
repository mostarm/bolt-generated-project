import { useLocation, useNavigate } from 'react-router-dom'
import { BottomNavigation, BottomNavigationAction, Paper } from '@mui/material'
import {
  Today as AgendaIcon,
  People as SpeakersIcon,
  Business as SponsorsIcon,
  Notifications as NotificationsIcon,
  More as MoreIcon
} from '@mui/icons-material'

function Navigation() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        value={location.pathname}
        onChange={(_, newValue) => navigate(newValue)}
      >
        <BottomNavigationAction label="Agenda" value="/" icon={<AgendaIcon />} />
        <BottomNavigationAction label="Speakers" value="/speakers" icon={<SpeakersIcon />} />
        <BottomNavigationAction label="Sponsors" value="/sponsors" icon={<SponsorsIcon />} />
        <BottomNavigationAction label="Notifications" value="/notifications" icon={<NotificationsIcon />} />
        <BottomNavigationAction label="More" value="/more" icon={<MoreIcon />} />
      </BottomNavigation>
    </Paper>
  )
}

export default Navigation
