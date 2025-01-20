import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, ThemeProvider, CssBaseline } from '@mui/material';
import Navigation from './components/Navigation';
import Agenda from './components/Agenda';
import Speakers from './components/Speakers';
import Sponsors from './components/Sponsors';
import Notifications from './components/Notifications';
import More from './components/More';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Box>
          <Navigation />
          <Box sx={{ mt: '64px', p: 2 }}>
            <Routes>
              <Route path="/" element={<Agenda />} />
              <Route path="/speakers" element={<Speakers />} />
              <Route path="/sponsors" element={<Sponsors />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/more" element={<More />} />
            </Routes>
          </Box>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
