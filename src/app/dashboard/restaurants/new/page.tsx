'use client';

import {
  Box,
  Typography,
  Button,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import RestaurantForm from '@/components/forms/RestaurantForm';
import { useTranslations } from 'next-intl';

export default function NewRestaurantPage() {
  const router = useRouter();
  const t = useTranslations('newRestaurant');
  const tc = useTranslations('common');

  return (
    <Box>
      <Button
        startIcon={<ArrowBack />}
        onClick={() => router.back()}
        sx={{ mb: 3 }}
      >
        {tc('back')}
      </Button>

      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        {t('title')}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {t('subtitle')}
      </Typography>

      <RestaurantForm mode="create" />
    </Box>
  );
}
