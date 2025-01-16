import { useParams } from 'react-router-dom'
import { Box, Typography } from '@mui/material'

function SpeakerDetails() {
  const { id } = useParams()

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Speaker Details
      </Typography>
      {/* Speaker details will be implemented next */}
    </Box>
  )
}

export default SpeakerDetails
