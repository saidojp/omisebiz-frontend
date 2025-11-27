'use client';

import { useFormContext } from 'react-hook-form';
import {
  Stack,
  TextField,
  Typography,
  Grid,
} from '@mui/material';
import type { RestaurantFormData } from '@/lib/validations';

export default function ContactsTab() {
  const {
    register,
    formState: { errors },
  } = useFormContext<RestaurantFormData>();

  return (
    <Stack spacing={3}>
      <Typography variant="h6" gutterBottom>
        Contact Information
      </Typography>

      {/* Phone */}
      <TextField
        {...register('contacts.phone')}
        label="Phone Number"
        fullWidth
        error={!!errors.contacts?.phone}
        helperText={errors.contacts?.phone?.message}
        placeholder="+1-234-567-8900"
      />

      {/* Email */}
      <TextField
        {...register('contacts.email')}
        label="Email"
        type="email"
        fullWidth
        error={!!errors.contacts?.email}
        helperText={errors.contacts?.email?.message}
        placeholder="info@restaurant.com"
      />

      {/* Website */}
      <TextField
        {...register('contacts.website')}
        label="Website URL"
        type="url"
        fullWidth
        error={!!errors.contacts?.website}
        helperText={errors.contacts?.website?.message}
        placeholder="https://www.restaurant.com"
      />

      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Address
      </Typography>

      {/* Street Address */}
      <TextField
        {...register('address.street')}
        label="Street Address"
        fullWidth
        error={!!errors.address?.street}
        helperText={errors.address?.street?.message}
        placeholder="123 Main Street"
      />

      {/* City, Zip */}
      <Grid container spacing={2}>
        <Grid item xs={12} sm={8}>
          <TextField
            {...register('address.city')}
            label="City"
            fullWidth
            error={!!errors.address?.city}
            helperText={errors.address?.city?.message}
            placeholder="Tokyo"
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            {...register('address.zip')}
            label="Postal Code"
            fullWidth
            error={!!errors.address?.zip}
            helperText={errors.address?.zip?.message}
            placeholder="100-0001"
          />
        </Grid>
      </Grid>

      {/* Country */}
      <TextField
        {...register('address.country')}
        label="Country"
        fullWidth
        error={!!errors.address?.country}
        helperText={errors.address?.country?.message}
        placeholder="Japan"
      />

      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Coordinates (Optional)
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register('location.lat', { 
              setValueAs: (v) => v === '' ? null : Number(v) 
            })}
            label="Latitude"
            type="number"
            fullWidth
            error={!!errors.location?.lat}
            helperText={errors.location?.lat?.message || 'e.g., 35.6762'}
            inputProps={{ step: 'any' }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            {...register('location.lng', { 
              setValueAs: (v) => v === '' ? null : Number(v) 
            })}
            label="Longitude"
            type="number"
            fullWidth
            error={!!errors.location?.lng}
            helperText={errors.location?.lng?.message || 'e.g., 139.6503'}
            inputProps={{ step: 'any' }}
          />
        </Grid>
      </Grid>
    </Stack>
  );
}
