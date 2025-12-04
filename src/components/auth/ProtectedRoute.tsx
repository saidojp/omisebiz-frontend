'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { CircularProgress, Box } from '@mui/material';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated, isGuest } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by only checking auth after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !isAuthenticated && !isGuest) {
      router.push('/login');
    }
  }, [mounted, isAuthenticated, isGuest, router]);

  // Show loading on server and during initial client render
  if (!mounted || (!isAuthenticated && !isGuest)) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return <>{children}</>;
}
