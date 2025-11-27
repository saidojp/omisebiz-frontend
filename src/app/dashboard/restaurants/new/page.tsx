'use client';

import {
  Box,
  Typography,
  Paper,
  Button,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/navigation';

export default function NewRestaurantPage() {
  const router = useRouter();

  return (
    <Box>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => router.back()}
        sx={{ mb: 3 }}
      >
        Back
      </Button>

      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        Create New Restaurant
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Add a new restaurant to your dashboard
      </Typography>

      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" gutterBottom>
          Restaurant Form Coming Soon
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Phase 5 will include the complete multi-step restaurant form
        </Typography>
      </Paper>
    </Box>
  );
}
