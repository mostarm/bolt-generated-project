import { useParams } from 'react-router-dom'
import { Box, Typography } from '@mui/material'

function TalkDetails() {
  const { id } = useParams()

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Talk Details
      </Typography>
      {/* Talk details will be implemented next */}
    </Box>
  )
}

export default TalkDetails
