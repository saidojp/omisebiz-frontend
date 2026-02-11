'use client';

import { useFormContext } from 'react-hook-form';
import {
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import type { RestaurantFormData } from '@/lib/validations';
import { useTranslations } from 'next-intl';

export default function SocialTab() {
  const {
    register,
    formState: { errors },
  } = useFormContext<RestaurantFormData>();
  const t = useTranslations('socialTab');

  return (
    <Stack spacing={3}>
      <Typography variant="h6" gutterBottom>
        {t('title')}
      </Typography>

      <TextField
        {...register('socials.instagram')}
        label={t('instagramUrl')}
        fullWidth
        error={!!errors.socials?.instagram}
        helperText={errors.socials?.instagram?.message}
        placeholder={t('instagramPlaceholder')}
      />

      <TextField
        {...register('socials.facebook')}
        label={t('facebookUrl')}
        fullWidth
        error={!!errors.socials?.facebook}
        helperText={errors.socials?.facebook?.message}
        placeholder={t('facebookPlaceholder')}
      />

      <TextField
        {...register('socials.tiktok')}
        label={t('tiktokUrl')}
        fullWidth
        error={!!errors.socials?.tiktok}
        helperText={errors.socials?.tiktok?.message}
        placeholder={t('tiktokPlaceholder')}
      />

      <TextField
        {...register('socials.youtube')}
        label={t('youtubeUrl')}
        fullWidth
        error={!!errors.socials?.youtube}
        helperText={errors.socials?.youtube?.message}
        placeholder={t('youtubePlaceholder')}
      />
    </Stack>
  );
}
