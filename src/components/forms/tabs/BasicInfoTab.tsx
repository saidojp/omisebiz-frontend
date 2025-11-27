'use client';

import { useFormContext, Controller } from 'react-hook-form';
import {
  Stack,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormLabel,
  Typography,
} from '@mui/material';
import { RESTAURANT_CATEGORIES, PRICE_RANGES } from '@/lib/constants';
import type { RestaurantFormData } from '@/lib/validations';

export default function BasicInfoTab() {
  const {
    register,
    control,
    watch,
    formState: { errors },
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
      <FormControl fullWidth error={!!errors.category}>
        <InputLabel>Category</InputLabel>
        <Controller
          name="category"
          control={control}
          render={({ field }) => (
            <Select {...field} label="Category">
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {RESTAURANT_CATEGORIES.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        {errors.category && (
          <FormHelperText>{errors.category.message}</FormHelperText>
        )}
      </FormControl>

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
      <FormControl error={!!errors.priceRange}>
        <FormLabel>Price Range</FormLabel>
        <Controller
          name="priceRange"
          control={control}
          render={({ field }) => (
            <RadioGroup {...field} row>
              {PRICE_RANGES.map((range) => (
                <FormControlLabel
                  key={range.value}
                  value={range.value}
                  control={<Radio />}
                  label={range.label}
                />
              ))}
            </RadioGroup>
          )}
        />
        {errors.priceRange && (
          <FormHelperText>{errors.priceRange.message}</FormHelperText>
        )}
      </FormControl>
    </Stack>
  );
}
