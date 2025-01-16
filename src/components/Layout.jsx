import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import Navigation from './Navigation'

function Layout() {
  return (
    <Box sx={{ pb: 7 }}>
      <Box component="main" sx={{ p: 2 }}>
        <Outlet />
      </Box>
      <Navigation />
    </Box>
  )
}

export default Layout
