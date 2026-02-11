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
import { useTranslations } from 'next-intl';

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
  const t = useTranslations('basicInfoTab');

  const description = watch('description') || '';

  const handleRegenerateSlug = async () => {
    if (!restaurantId) return;
    setRegenerating(true);
    setRegenMessage(null);
    try {
      const data = await regenerateRestaurantSlug(restaurantId);
      setRegenMessage({ type: 'success', text: t('slugUpdated', { slug: data.restaurant.slug }) });
    } catch (error) {
      setRegenMessage({ type: 'error', text: t('slugFailed') });
    } finally {
      setRegenerating(false);
    }
  };

  return (
    <Stack spacing={3}>
      <Typography variant="h6" gutterBottom>
        {t('title')}
      </Typography>

      {/* Restaurant Name */}
      <Box>
        <TextField
          {...register('name')}
          label={t('restaurantName')}
          required
          fullWidth
          error={!!errors.name}
          helperText={
            errors.name?.message ||
            t('nameHint')
          }
          placeholder={t('namePlaceholder')}
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
              {t('regenerateUrl')}
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
        label={t('categoryLabel')}
        fullWidth
        error={!!errors.category}
        helperText={errors.category?.message}
        placeholder={t('categoryPlaceholder')}
      />

      {/* Description */}
      <TextField
        {...register('description')}
        label={t('descriptionLabel')}
        multiline
        rows={4}
        fullWidth
        error={!!errors.description}
        helperText={
          errors.description?.message ||
          t('descriptionCount', { count: description.length })
        }
        placeholder={t('descriptionPlaceholder')}
        inputProps={{ maxLength: 750 }}
      />

      {/* Price Range */}
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          {t('priceRange')}
        </Typography>
        <Stack direction="row" spacing={2} alignItems="flex-start">
          <TextField
            {...register('priceRange.min', { valueAsNumber: true })}
            label={t('minPrice')}
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
            label={t('maxPrice')}
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
                    {t('publishRestaurant')}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {t('publishHint')}
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
