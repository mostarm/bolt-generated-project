import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '28px',
      fontWeight: 700,
    },
    h2: {
      fontSize: '24px',
      fontWeight: 700,
    },
    h6: {
      fontSize: '20px',
      fontWeight: 600,
    },
    body1: {
      fontSize: '16px',
    },
    body2: {
      fontSize: '14px',
    },
  },
  palette: {
    mode: 'dark',
    primary: {
      main: '#00AEEF',
      light: '#33BEFF',
      dark: '#0099D6',
    },
    secondary: {
      main: '#8E44AD',
      light: '#A569BD',
      dark: '#703688',
    },
    background: {
      default: '#121212',
      paper: '#1C1C1C',
    },
    text: {
      primary: '#EAEAEA',
      secondary: '#B3B3B3',
    },
    error: {
      main: '#FF4C4C',
    },
    success: {
      main: '#00E676',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#121212',
          scrollbarColor: '#2c2c2c #121212',
          '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
            width: '8px',
            height: '8px',
          },
          '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
            borderRadius: 8,
            backgroundColor: '#2c2c2c',
            '&:hover': {
              backgroundColor: '#3c3c3c',
            },
          },
          '&::-webkit-scrollbar-track, & *::-webkit-scrollbar-track': {
            backgroundColor: '#121212',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1C1C1C',
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 12px rgba(0, 174, 239, 0.15)',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 0 15px rgba(0, 174, 239, 0.4)',
          },
        },
        contained: {
          backgroundImage: 'linear-gradient(45deg, #00AEEF, #0099D6)',
          '&:hover': {
            backgroundImage: 'linear-gradient(45deg, #33BEFF, #00AEEF)',
          },
        },
        outlined: {
          borderColor: '#00AEEF',
          '&:hover': {
            borderColor: '#33BEFF',
            backgroundColor: 'rgba(0, 174, 239, 0.1)',
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1C1C1C',
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          backgroundColor: '#1C1C1C',
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          color: '#B3B3B3',
          '&.Mui-selected': {
            color: '#00AEEF',
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: '#00AEEF',
          height: '3px',
          borderRadius: '3px 3px 0 0',
          boxShadow: '0 0 10px rgba(0, 174, 239, 0.5)',
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          '&.Mui-selected': {
            color: '#00AEEF',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(142, 68, 173, 0.2)',
          '&:hover': {
            backgroundColor: 'rgba(142, 68, 173, 0.3)',
          },
        },
        filled: {
          backgroundColor: 'rgba(0, 174, 239, 0.2)',
          '&:hover': {
            backgroundColor: 'rgba(0, 174, 239, 0.3)',
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: 'rgba(0, 174, 239, 0.1)',
            transform: 'scale(1.1)',
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        switchBase: {
          '&.Mui-checked': {
            color: '#00AEEF',
            '& + .MuiSwitch-track': {
              backgroundColor: '#00AEEF',
              opacity: 0.5,
            },
          },
        },
      },
    },
  },
});

export default theme;
