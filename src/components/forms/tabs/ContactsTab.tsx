'use client';

import { useFormContext } from 'react-hook-form';
import {
  Stack,
  TextField,
  Typography,
  Box,
} from '@mui/material';
import type { RestaurantFormData } from '@/lib/validations';
import { useTranslations } from 'next-intl';

export default function ContactsTab() {
  const {
    register,
    formState: { errors },
  } = useFormContext<RestaurantFormData>();
  const t = useTranslations('contactsTab');

  return (
    <Stack spacing={3}>
      <Typography variant="h6" gutterBottom>
        {t('title')}
      </Typography>

      {/* Phone */}
      <TextField
        {...register('contacts.phone')}
        label={t('phone')}
        fullWidth
        error={!!errors.contacts?.phone}
        helperText={errors.contacts?.phone?.message}
        placeholder={t('phonePlaceholder')}
      />

      {/* Email */}
      <TextField
        {...register('contacts.email')}
        label={t('email')}
        type="email"
        fullWidth
        error={!!errors.contacts?.email}
        helperText={errors.contacts?.email?.message}
        placeholder={t('emailPlaceholder')}
      />

      {/* Website */}
      <TextField
        {...register('contacts.website')}
        label={t('website')}
        type="url"
        fullWidth
        error={!!errors.contacts?.website}
        helperText={errors.contacts?.website?.message}
        placeholder={t('websitePlaceholder')}
      />

      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        {t('address')}
      </Typography>

      {/* Street Address */}
      <TextField
        {...register('address.street')}
        label={t('street')}
        fullWidth
        error={!!errors.address?.street}
        helperText={errors.address?.street?.message}
        placeholder={t('streetPlaceholder')}
      />

      {/* City, Zip */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Box sx={{ flex: 2 }}>
          <TextField
            {...register('address.city')}
            label={t('city')}
            fullWidth
            error={!!errors.address?.city}
            helperText={errors.address?.city?.message}
            placeholder={t('cityPlaceholder')}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <TextField
            {...register('address.zip')}
            label={t('postalCode')}
            fullWidth
            error={!!errors.address?.zip}
            helperText={errors.address?.zip?.message}
            placeholder={t('postalCodePlaceholder')}
          />
        </Box>
      </Stack>

      {/* Country */}
      <TextField
        {...register('address.country')}
        label={t('country')}
        fullWidth
        error={!!errors.address?.country}
        helperText={errors.address?.country?.message}
        placeholder={t('countryPlaceholder')}
      />

      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        {t('coordinates')}
      </Typography>

      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
        <Box sx={{ flex: 1 }}>
          <TextField
            {...register('location.lat', {
              setValueAs: (v) => v === '' ? null : Number(v)
            })}
            label={t('latitude')}
            type="number"
            fullWidth
            error={!!errors.location?.lat}
            helperText={errors.location?.lat?.message || t('latitudeHint')}
            inputProps={{ step: 'any' }}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <TextField
            {...register('location.lng', {
              setValueAs: (v) => v === '' ? null : Number(v)
            })}
            label={t('longitude')}
            type="number"
            fullWidth
            error={!!errors.location?.lng}
            helperText={errors.location?.lng?.message || t('longitudeHint')}
            inputProps={{ step: 'any' }}
          />
        </Box>
      </Stack>
    </Stack>
  );
}
