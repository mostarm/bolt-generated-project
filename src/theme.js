import { createTheme } from '@mui/material/styles';

const theme = createTheme({
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
      paper: '#1B2332',
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
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1B2332',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }
      }
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          minHeight: '64px',
          '@media (min-width: 600px)': {
            minHeight: '64px',
          },
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontSize: '0.9rem',
          fontWeight: 500,
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1B2332',
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
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1B2332',
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
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
