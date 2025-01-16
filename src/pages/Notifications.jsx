import { Box, Typography } from '@mui/material'
import useStore from '../store/useStore'

function Notifications() {
  const notifications = useStore((state) => state.notifications)

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Notifications
      </Typography>
      {/* Notifications list will be implemented next */}
    </Box>
  )
}

export default Notifications
