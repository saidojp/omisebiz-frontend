'use client';

import { useFormContext } from 'react-hook-form';
import {
  Stack,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Box,
  Divider,
} from '@mui/material';
import { ATTRIBUTE_GROUPS } from '@/lib/constants';
import type { RestaurantFormData } from '@/lib/validations';

export default function AttributesTab() {
  const { register } = useFormContext<RestaurantFormData>();

  return (
    <Stack spacing={4}>
      <Typography variant="h6" gutterBottom>
        Restaurant Attributes
      </Typography>

      {Object.entries(ATTRIBUTE_GROUPS).map(([groupKey, group]) => (
        <Box key={groupKey}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            {group.label}
          </Typography>
          <FormGroup>
            {group.items.map((item) => (
              <FormControlLabel
                key={item.key}
                control={<Checkbox {...register(`attributes.${item.key}`)} />}
                label={item.label}
              />
            ))}
          </FormGroup>
          <Divider sx={{ mt: 2 }} />
        </Box>
      ))}
    </Stack>
  );
}
