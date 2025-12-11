'use client';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

declare module '@mui/material/styles' {
  interface Palette {
    sidebar: {
      hoverBg: string;
      hoverText: string;
    };
  }
  interface PaletteOptions {
    sidebar?: {
      hoverBg: string;
      hoverText: string;
    };
  }
}

const theme = createTheme({
  palette: {
    mode: 'light',
    sidebar: {
      hoverBg: '#edededff', // Light Coral (separated from primary)
      hoverText: '#292524', // Dark Coral
    },
    primary: {
      main: '#1565c0', // Strong Blue (for text/icons)
      light: '#e3f2fd', // Pastel Blue
      dark: '#0d47a1',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#7b1fa2', // Reverted to purple-ish to compliment blue? Or keep orange? User didn't specify. Keeping separate updates minimal.
      light: '#f3e5f5',
      dark: '#4a0072',
      contrastText: '#ffffff',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#292524', 
      secondary: '#78716C', 
    },
    divider: '#eaeff1', // Cooler divider for blue theme
  },
  typography: {
    fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
    h1: { fontWeight: 800, color: '#292524', letterSpacing: '-0.02em' },
    h2: { fontWeight: 800, color: '#292524', letterSpacing: '-0.01em' },
    h3: { fontWeight: 700, color: '#292524' },
    h4: { fontWeight: 700, color: '#292524' },
    h5: { fontWeight: 600, color: '#292524' },
    h6: { fontWeight: 600, color: '#292524' },
    button: { fontWeight: 600, letterSpacing: '0.01em' },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '50px',
          padding: '10px 24px',
          fontSize: '0.95rem',
          transition: 'all 0.2s ease-in-out',
        },
        containedPrimary: {
          backgroundColor: '#e3f2fd', // Pastel Blue
          color: '#1565c0', // Dark Blue Text
          '&:hover': {
            backgroundColor: '#bbdefb', // Slightly darker pastel
            transform: 'translateY(-1px)',
          },
        },
        outlined: {
          borderWidth: '1.5px',
          borderColor: '#e3f2fd',
          color: '#1565c0',
          '&:hover': {
            backgroundColor: '#f5fbfd',
            borderColor: '#bbdefb',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px 0 rgba(21, 101, 192, 0.08)',
          border: '1px solid #e3f2fd',
          borderRadius: '20px',
          backgroundColor: '#FAFAFA',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0 4px 12px 0 rgba(21, 101, 192, 0.12)',
          },
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
          backgroundColor: '#FFFFFF',
          color: '#292524',
          borderBottom: '1px solid #eaeff1',
          boxShadow: '0 1px 2px 0 rgba(21, 101, 192, 0.05)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#FAFAFA',
          borderRight: '1px solid #eaeff1',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          fontWeight: 600,
          fontSize: '0.875rem',
        },
        filled: {
          backgroundColor: '#e3f2fd',
          color: '#1565c0',
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