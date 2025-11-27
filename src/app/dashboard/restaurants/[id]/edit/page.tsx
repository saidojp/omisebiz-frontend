'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import api from '@/lib/api';
import RestaurantForm from '@/components/forms/RestaurantForm';
import type { Restaurant } from '@/lib/types';

export default function EditRestaurantPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await api.get(`/restaurants/${id}`);
        setRestaurant(response.data.restaurant);
      } catch (err: any) {
        setError(err.response?.data?.error?.message || 'Failed to load restaurant');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
        <Button onClick={() => router.back()}>Go Back</Button>
      </Box>
    );
  }

  if (!restaurant) {
    return null;
  }

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
        Edit Restaurant
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Update your restaurant profile information
      </Typography>

      <RestaurantForm restaurant={restaurant} mode="edit" />
    </Box>
  );
}
