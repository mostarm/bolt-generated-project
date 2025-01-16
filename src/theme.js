import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  components: {
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          height: 65,
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            fontSize: '0.75rem',
          },
        },
      },
    },
  },
});

export default theme;
