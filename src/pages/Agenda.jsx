import { useState } from 'react'
import { Box, Typography, Switch, FormControlLabel } from '@mui/material'
import useStore from '../store/useStore'

function Agenda() {
  const [showFavorites, setShowFavorites] = useState(false)

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Agenda
      </Typography>
      <FormControlLabel
        control={
          <Switch
            checked={showFavorites}
            onChange={(e) => setShowFavorites(e.target.checked)}
          />
        }
        label="Show Favorites Only"
      />
      {/* Agenda content will be implemented next */}
    </Box>
  )
}

export default Agenda
