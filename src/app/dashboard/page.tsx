'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Container, Typography, CircularProgress } from '@mui/material';
import { useAuthStore } from '@/lib/store';

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, isGuest, user } = useAuthStore();

  useEffect(() => {
    // Redirect guests to public restaurants, authenticated users to their restaurants
    if (isGuest) {
      router.push('/dashboard/public-restaurants');
    } else {
      router.push('/dashboard/restaurants');
    }
  }, [router, isGuest]);

  if (!isAuthenticated && !isGuest) {
    return (
      <Container>
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography variant="h4" gutterBottom>
          {isGuest ? 'Welcome, Guest!' : `Welcome, ${user?.username}!`}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Redirecting...
        </Typography>
      </Box>
    </Container>
  );
}
