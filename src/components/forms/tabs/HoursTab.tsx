'use client';

import { useFormContext, Controller } from 'react-hook-form';
import {
  Stack,
  TextField,
  Typography,
  Switch,
  FormControlLabel,
  Box,
  FormHelperText,
  Divider,
  Button,
} from '@mui/material';
import { ContentCopy } from '@mui/icons-material';
import { DAYS_OF_WEEK } from '@/lib/constants';
import type { RestaurantFormData, HourEntry } from '@/lib/validations';

const DAY_LABELS: Record<string, string> = {
  monday: 'Monday',
  tuesday: 'Tuesday',
  wednesday: 'Wednesday',
  thursday: 'Thursday',
  friday: 'Friday',
  saturday: 'Saturday',
  sunday: 'Sunday',
};

export default function HoursTab() {
  const { control, watch, setValue, register, formState: { errors } } = useFormContext<RestaurantFormData>();

  const hours = watch('hours');

  const copyToAllDays = () => {
    const mondayHours = hours?.monday;
    if (mondayHours) {
      DAYS_OF_WEEK.forEach((day) => {
        if (day !== 'monday') {
          setValue(`hours.${day}`, mondayHours);
        }
      });
    }
  };

  return (
    <Stack spacing={3}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">
          Hours of Operation
        </Typography>
        <Button
          variant="outlined"
          size="small"
          startIcon={<ContentCopy />}
          onClick={copyToAllDays}
        >
          Copy Monday to All Days
        </Button>
      </Box>

      <Stack spacing={2} divider={<Divider />}>
        {DAYS_OF_WEEK.map((day) => (
          <Controller
            key={day}
            name={`hours.${day}`}
            control={control}
            render={({ field }) => {
              const value = field.value as HourEntry;
              const isOpen = value?.isOpen ?? false;

              return (
                <Box>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
                    <Box sx={{ width: { xs: '100%', sm: '25%' } }}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={isOpen}
                            onChange={(e) => {
                              const newOpen = e.target.checked;
                              setValue(`hours.${day}.isOpen`, newOpen);
                              if (newOpen) {
                                setValue(`hours.${day}.open`, '09:00');
                                setValue(`hours.${day}.close`, '17:00');
                              }
                            }}
                          />
                        }
                        label={day.charAt(0).toUpperCase() + day.slice(1)}
                      />
                    </Box>

                    {isOpen && 'open' in value && 'close' in value && (
                      <>
                        <Box sx={{ width: { xs: '50%', sm: '25%' } }}>
                          <TextField
                            label="Open"
                            type="time"
                            size="small"
                            fullWidth
                            {...register(`hours.${day}.open`)}
                            error={!!(errors.hours?.[day] as any)?.open}
                            InputLabelProps={{ shrink: true }}
                          />
                        </Box>
                        <Box sx={{ width: { xs: '50%', sm: '25%' } }}>
                          <TextField
                            label="Close"
                            type="time"
                            size="small"
                            fullWidth
                            {...register(`hours.${day}.close`)}
                            error={!!(errors.hours?.[day] as any)?.close}
                            InputLabelProps={{ shrink: true }}
                          />
                        </Box>
                      </>
                    )}

                    {!isOpen && (
                      <Box sx={{ width: { xs: '100%', sm: '50%' } }}>
                        <Typography variant="body2" color="text.secondary">
                          Closed
                        </Typography>
                      </Box>
                    )}
                  </Stack>
                  {(errors.hours?.[day] as any)?.message && (
                    <FormHelperText error>
                      {(errors.hours?.[day] as any)?.message}
                    </FormHelperText>
                  )}
                </Box>
              );
            }}
          />
        ))}
      </Stack>
    </Stack>
  );
}
