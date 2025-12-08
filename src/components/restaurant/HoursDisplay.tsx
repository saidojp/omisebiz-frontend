import { Box, Typography, Stack } from '@mui/material';
import { RestaurantHours, DayOfWeek } from '@/lib/types';
import { DAYS_OF_WEEK } from '@/lib/constants';

interface Props {
  hours?: RestaurantHours;
}

export default function HoursDisplay({ hours }: Props) {
  if (!hours) return <Typography>Hours not available</Typography>;

  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase() as DayOfWeek;

  return (
    <Stack spacing={1}>
      {DAYS_OF_WEEK.map((day) => {
        const entry = hours[day];
        const isToday = day === today;

        return (
          <Box 
            key={day} 
            sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              fontWeight: isToday ? 'bold' : 'normal',
              color: isToday ? 'primary.main' : 'inherit'
            }}
          >
            <Typography sx={{ textTransform: 'capitalize', fontWeight: 'inherit' }}>
              {day}
            </Typography>
            <Box sx={{ textAlign: 'right' }}>
              <Typography sx={{ fontWeight: 'inherit' }}>
                {entry?.isOpen ? `${entry.open} - ${entry.close}` : 'Closed'}
              </Typography>
              {entry?.isOpen && entry?.breakStart && entry?.breakEnd && (
                <Typography variant="caption" display="block" color="text.secondary">
                  Break: {entry.breakStart} - {entry.breakEnd}
                </Typography>
              )}
            </Box>
          </Box>
        );
      })}
    </Stack>
  );
}
