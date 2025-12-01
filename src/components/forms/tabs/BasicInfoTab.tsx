'use client';

import { useFormContext, Controller } from 'react-hook-form';
import {
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import type { RestaurantFormData } from '@/lib/validations';

export default function BasicInfoTab() {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<RestaurantFormData>();

  const description = watch('description') || '';

  return (
    <Stack spacing={3}>
      <Typography variant="h6" gutterBottom>
        Basic Information
      </Typography>

      {/* Restaurant Name */}
      <TextField
        {...register('name')}
        label="Restaurant Name"
        required
        fullWidth
        error={!!errors.name}
        helperText={errors.name?.message}
        placeholder="e.g., Sakura Sushi Bar"
      />

      {/* Category */}
      <TextField
        {...register('category')}
        label="Category"
        fullWidth
        error={!!errors.category}
        helperText={errors.category?.message}
        placeholder="e.g., Japanese, Italian, Cafe"
      />

      {/* Description */}
      <TextField
        {...register('description')}
        label="Description"
        multiline
        rows={4}
        fullWidth
        error={!!errors.description}
        helperText={
          errors.description?.message ||
          `${description.length}/750 characters`
        }
        placeholder="Tell customers about your restaurant..."
        inputProps={{ maxLength: 750 }}
      />

      {/* Price Range */}
      <TextField
        {...register('priceRange')}
        label="Price Range"
        fullWidth
        error={!!errors.priceRange}
        helperText={errors.priceRange?.message || 'e.g., $$-$$$, Moderate, 10-20 USD'}
        placeholder="Enter price range"
      />
    </Stack>
  );
}
