'use client';

import { useFormContext, Controller } from 'react-hook-form';
import {
  Stack,
  TextField,
  Typography,
  FormControlLabel,
  Switch,
  Box,
} from '@mui/material';
import type { RestaurantFormData } from '@/lib/validations';

export default function BasicInfoTab() {
  const {
    register,
    control,
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
        helperText={
          errors.name?.message || 
          "⚠️ Note: Changing the name won't update the public URL address"
        }
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
        helperText={errors.priceRange?.message || 'e.g., 2000-3000¥, 1500-2500₽, $15-25'}
        placeholder="2000-3000¥"
      />

      {/* Publish Status */}
      <Box sx={{ pt: 2 }}>
        <Controller
          name="isPublished"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={
                <Switch
                  checked={field.value || false}
                  onChange={(e) => field.onChange(e.target.checked)}
                  color="primary"
                />
              }
              label={
                <Box>
                  <Typography variant="body1" fontWeight="medium">
                    Publish Restaurant
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Make this restaurant visible on public pages
                  </Typography>
                </Box>
              }
            />
          )}
        />
      </Box>
    </Stack>
  );
}
