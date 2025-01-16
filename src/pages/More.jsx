import { Box, List, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material'
import {
  Feedback,
  QrCode,
  Info,
  Security,
  ContactSupport,
  Help,
  Logout
} from '@mui/icons-material'

function More() {
  return (
    <Box>
      <List>
        <ListItem button>
          <ListItemIcon><Feedback /></ListItemIcon>
          <ListItemText primary="Leave Feedback" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><QrCode /></ListItemIcon>
          <ListItemText primary="Scan QR Code" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><Info /></ListItemIcon>
          <ListItemText primary="About the Conference" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><Security /></ListItemIcon>
          <ListItemText primary="Privacy Policy" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><ContactSupport /></ListItemIcon>
          <ListItemText primary="Contact Us" />
        </ListItem>
        <ListItem button>
          <ListItemIcon><Help /></ListItemIcon>
          <ListItemText primary="Help" />
        </ListItem>
        <Divider />
        <ListItem button>
          <ListItemIcon><Logout /></ListItemIcon>
          <ListItemText primary="Log Out" />
        </ListItem>
      </List>
    </Box>
  )
}

export default More
