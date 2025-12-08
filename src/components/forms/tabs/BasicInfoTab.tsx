'use client';

import { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import {
  Stack,
  TextField,
  Typography,
  FormControlLabel,
  Switch,
  Box,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Refresh } from '@mui/icons-material';
import type { RestaurantFormData } from '@/lib/validations';
import { regenerateRestaurantSlug } from '@/lib/api';

interface BasicInfoTabProps {
  restaurantId?: string;
  mode: 'create' | 'edit';
}

export default function BasicInfoTab({ restaurantId, mode }: BasicInfoTabProps) {
  const {
    register,
    control,
    formState: { errors },
    watch,
  } = useFormContext<RestaurantFormData>();

  const [regenerating, setRegenerating] = useState(false);
  const [regenMessage, setRegenMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const description = watch('description') || '';

  const handleRegenerateSlug = async () => {
    if (!restaurantId) return;
    setRegenerating(true);
    setRegenMessage(null);
    try {
      const data = await regenerateRestaurantSlug(restaurantId);
      setRegenMessage({ type: 'success', text: `Slug updated to: ${data.restaurant.slug}` });
    } catch (error) {
      setRegenMessage({ type: 'error', text: 'Failed to regenerate slug' });
    } finally {
      setRegenerating(false);
    }
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h6" gutterBottom>
        Basic Information
      </Typography>

      {/* Restaurant Name */}
      <Box>
        <TextField
          {...register('name')}
          label="Restaurant Name"
          required
          fullWidth
          error={!!errors.name}
          helperText={
            errors.name?.message || 
            "ℹ️ The public URL will automatically update based on the restaurant name"
          }
          placeholder="e.g., Sakura Sushi Bar"
        />
        {mode === 'edit' && restaurantId && (
          <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Button
              size="small"
              variant="text"
              onClick={handleRegenerateSlug}
              disabled={regenerating}
              startIcon={regenerating ? <CircularProgress size={16} /> : <Refresh />}
            >
              Regenerate Public URL
            </Button>
            {regenMessage && (
              <Alert severity={regenMessage.type} sx={{ mt: 1, py: 0, px: 2 }}>
                {regenMessage.text}
              </Alert>
            )}
          </Box>
        )}
      </Box>

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
      {/* Price Range */}
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Price Range (¥)
        </Typography>
        <Stack direction="row" spacing={2} alignItems="flex-start">
          <TextField
            {...register('priceRange.min', { valueAsNumber: true })}
            label="Min Price"
            type="number"
            fullWidth
            error={!!errors.priceRange?.min}
            helperText={errors.priceRange?.min?.message}
            InputProps={{
              startAdornment: <Typography sx={{ mr: 1 }}>¥</Typography>,
            }}
          />
          <Typography sx={{ alignSelf: 'center' }}>-</Typography>
          <TextField
            {...register('priceRange.max', { valueAsNumber: true })}
            label="Max Price"
            type="number"
            fullWidth
            error={!!errors.priceRange?.max}
            helperText={errors.priceRange?.max?.message}
            InputProps={{
              startAdornment: <Typography sx={{ mr: 1 }}>¥</Typography>,
            }}
          />
          <input 
            type="hidden" 
            {...register('priceRange.currency')} 
            value="¥" 
          />
        </Stack>
      </Box>

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
