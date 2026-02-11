import { Box, Typography, Stack } from '@mui/material';
import { RestaurantHours, DayOfWeek } from '@/lib/types';
import { DAYS_OF_WEEK } from '@/lib/constants';
import { useTranslations } from 'next-intl';

interface Props {
  hours?: RestaurantHours;
}

export default function HoursDisplay({ hours }: Props) {
  const t = useTranslations('hours');
  const tc = useTranslations('common');

  if (!hours) return <Typography>{t('notAvailable')}</Typography>;

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
              alignItems: 'center',
              fontWeight: isToday ? 'bold' : 'normal',
              color: isToday ? 'primary.main' : 'inherit',
            }}
          >
            <Typography variant="body2" fontWeight={isToday ? 'bold' : 'normal'}>
              {t(day)}
            </Typography>
            <Typography variant="body2">
              {entry?.isOpen ? `${entry.open} - ${entry.close}` : tc('closed')}
            </Typography>
          </Box>
        );
      })}
    </Stack>
  );
}
