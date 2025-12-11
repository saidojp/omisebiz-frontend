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
      main: '#3a3737ff',
      light: '#FEE2E2',
      dark: '#DC2626',
      contrastText: '#292524',
    },
    secondary: {
      main: '#FB923C',    
      light: '#FFEDD5',
      dark: '#EA580C',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#292524', 
      secondary: '#78716C', 
    },
    divider: '#F5E6E0',
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
          backgroundColor: '#F87171',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#DC2626',
            transform: 'translateY(-1px)',
          },
        },
        outlined: {
          borderWidth: '1.5px',
          borderColor: '#E7D5CE',
          color: '#57534E',
          '&:hover': {
            backgroundColor: '#FEF3F0',
            borderColor: '#D6C3BA',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 3px 0 rgba(248, 113, 113, 0.08)',
          border: '1px solid #F5E6E0',
          borderRadius: '20px',
          backgroundColor: '#FAFAFA',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            boxShadow: '0 4px 12px 0 rgba(248, 113, 113, 0.15)',
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
          borderBottom: '1px solid #F5E6E0',
          boxShadow: '0 1px 2px 0 rgba(248, 113, 113, 0.06)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#FAFAFA',
          borderRight: '1px solid #F5E6E0',
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
          backgroundColor: '#FEE2E2',
          color: '#DC2626',
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