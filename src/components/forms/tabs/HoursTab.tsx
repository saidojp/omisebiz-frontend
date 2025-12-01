'use client';

import { useFormContext, Controller } from 'react-hook-form';
import {
  Stack,
  Typography,
  Box,
  FormControlLabel,
  Switch,
  TextField,
  Grid,
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
  const { control, watch, setValue } = useFormContext<RestaurantFormData>();

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
                  <Grid container spacing={2} alignItems="center">
                    <Grid xs={12} sm={3}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={isOpen}
                            onChange={(e) => {
                              if (e.target.checked) {
                                field.onChange({
                                  isOpen: true,
                                  open: '09:00',
                                  close: '22:00',
                                });
                              } else {
                                field.onChange({ isOpen: false });
                              }
                            }}
                          />
                        }
                        label={DAY_LABELS[day]}
                      />
                    </Grid>

                    {isOpen && 'open' in value && 'close' in value && (
                      <>
                        <Grid xs={6} sm={3}>
                          <TextField
                            label="Open"
                            type="time"
                            fullWidth
                            size="small"
                            value={value.open}
                            onChange={(e) =>
                              field.onChange({
                                ...value,
                                open: e.target.value,
                              })
                            }
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                        <Grid xs={6} sm={3}>
                          <TextField
                            label="Close"
                            type="time"
                            fullWidth
                            size="small"
                            value={value.close}
                            onChange={(e) =>
                              field.onChange({
                                ...value,
                                close: e.target.value,
                              })
                            }
                            InputLabelProps={{ shrink: true }}
                          />
                        </Grid>
                      </>
                    )}

                    {!isOpen && (
                      <Grid xs={12} sm={6}>
                        <Typography variant="body2" color="text.secondary">
                          Closed
                        </Typography>
                      </Grid>
                    )}
                  </Grid>
                </Box>
              );
            }}
          />
        ))}
      </Stack>
    </Stack>
  );
}
