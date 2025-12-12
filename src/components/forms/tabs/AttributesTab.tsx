import { useFormContext, Controller } from 'react-hook-form';
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
  const { control } = useFormContext<RestaurantFormData>();

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
              <Controller
                key={item.key}
                name={`attributes.${item.key}`}
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox 
                        checked={!!field.value} 
                        onChange={(e) => field.onChange(e.target.checked)} 
                      />
                    }
                    label={item.label}
                  />
                )}
              />
            ))}
          </FormGroup>
          <Divider sx={{ mt: 2 }} />
        </Box>
      ))}
    </Stack>
  );
}
