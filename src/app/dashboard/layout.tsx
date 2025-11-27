'use client';

import { useState } from 'react';
import { Box, Toolbar, useTheme, useMediaQuery } from '@mui/material';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';

const DRAWER_WIDTH = 260;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <ProtectedRoute>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        {/* Header */}
        <Header onMenuClick={handleDrawerToggle} />

        {/* Sidebar */}
        <Sidebar open={mobileOpen} onClose={handleDrawerToggle} />

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            width: { xs: '100%', md: `calc(100% - ${DRAWER_WIDTH}px)` },
            backgroundColor: 'background.default',
            minHeight: '100vh',
          }}
        >
          {/* Toolbar spacer to push content below AppBar */}
          <Toolbar />

          {/* Page Content */}
          <Box sx={{ p: { xs: 2, sm: 3 } }}>
            {children}
          </Box>
        </Box>
      </Box>
    </ProtectedRoute>
  );
}
