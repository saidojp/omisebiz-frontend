'use client';

import { useFormContext } from 'react-hook-form';
import {
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import type { RestaurantFormData } from '@/lib/validations';

export default function SocialTab() {
  const {
    register,
    formState: { errors },
  } = useFormContext<RestaurantFormData>();

  return (
    <Stack spacing={3}>
      <Typography variant="h6" gutterBottom>
        Social Media Links
      </Typography>

      <TextField
        {...register('socials.instagram')}
        label="Instagram URL"
        fullWidth
        error={!!errors.socials?.instagram}
        helperText={errors.socials?.instagram?.message}
        placeholder="https://instagram.com/yourrestaurant"
      />

      <TextField
        {...register('socials.facebook')}
        label="Facebook URL"
        fullWidth
        error={!!errors.socials?.facebook}
        helperText={errors.socials?.facebook?.message}
        placeholder="https://facebook.com/yourrestaurant"
      />

      <TextField
        {...register('socials.tiktok')}
        label="TikTok URL (Optional)"
        fullWidth
        error={!!errors.socials?.tiktok}
        helperText={errors.socials?.tiktok?.message}
        placeholder="https://tiktok.com/@yourrestaurant"
      />

      <TextField
        {...register('socials.youtube')}
        label="YouTube URL (Optional)"
        fullWidth
        error={!!errors.socials?.youtube}
        helperText={errors.socials?.youtube?.message}
        placeholder="https://youtube.com/@yourrestaurant"
      />
    </Stack>
  );
}
