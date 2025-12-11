'use client';

import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#e3f2fd', // Soft Pastel Blue
      light: '#ffffff',
      dark: '#bbdefb',
      contrastText: '#1565c0', // Dark Blue text for contrast
    },
    secondary: {
      main: '#f3e5f5', // Soft Purple
      light: '#ffffff',
      dark: '#e1bee7',
      contrastText: '#7b1fa2',
    },
    background: {
      default: '#ffffff',
      paper: '#fafafa', // Very light grey for cards/sections
    },
    text: {
      primary: '#212121', // Soft Black
      secondary: '#757575', // Grey
    },
  },
  typography: {
    fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
    h1: { fontWeight: 800, color: '#212121' },
    h2: { fontWeight: 800, color: '#212121' },
    h3: { fontWeight: 700, color: '#212121' },
    h4: { fontWeight: 700, color: '#212121' },
    h5: { fontWeight: 600, color: '#212121' },
    h6: { fontWeight: 600, color: '#424242' },
    button: { fontWeight: 600 },
  },
  shape: {
    borderRadius: 16, // Global slightly larger radius
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '50px', // Pill shape
          padding: '10px 24px',
          fontSize: '0.95rem',
        },
        containedPrimary: {
          backgroundColor: '#e3f2fd',
          color: '#1565c0',
          '&:hover': {
            backgroundColor: '#bbdefb',
          },
        },
        outlined: {
          borderWidth: '1px',
          borderColor: '#e0e0e0',
          color: '#424242',
          '&:hover': {
            backgroundColor: '#f5f5f5',
            borderColor: '#bdbdbd',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          border: '1px solid #f5f5f5', // Very subtle border
          borderRadius: '24px',
          backgroundColor: '#fafafa',
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#212121',
          borderBottom: '1px solid #f5f5f5',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#f8fafc', // Slightly different sidebar bg
          borderRight: 'none',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          fontWeight: 600,
        },
      },
    },
  },
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
