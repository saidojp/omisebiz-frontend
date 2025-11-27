'use client';

import {
  Box,
  Typography,
  Button,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import RestaurantForm from '@/components/forms/RestaurantForm';

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
        Fill in the details below to create your restaurant profile
      </Typography>

      <RestaurantForm mode="create" />
    </Box>
  );
}
