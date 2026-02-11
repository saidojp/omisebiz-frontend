import { Stack, Button, IconButton, Tooltip } from '@mui/material';
import { Phone, Directions, Share } from '@mui/icons-material';
import { Restaurant } from '@/lib/types';
import { useTranslations } from 'next-intl';

interface Props {
  restaurant: Restaurant;
}

export default function ActionBar({ restaurant }: Props) {
  const t = useTranslations('restaurantPublic');

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: restaurant.name,
        text: restaurant.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(t('linkCopied'));
    }
  };

  const getGoogleMapsUrl = () => {
    // If we have precise location data (lat/lng), use it
    if (restaurant.location &&
      typeof restaurant.location.lat === 'number' &&
      typeof restaurant.location.lng === 'number') {
      return `https://www.google.com/maps/search/?api=1&query=${restaurant.location.lat},${restaurant.location.lng}`;
    }

    // Fallback to address search
    const address = [
      restaurant.address?.street,
      restaurant.address?.city,
      restaurant.address?.zip,
      restaurant.address?.country
    ].filter(Boolean).join(', ');

    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  };

  return (
    <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
      {restaurant.contacts?.phone && (
        <Button
          variant="contained"
          startIcon={<Phone />}
          href={`tel:${restaurant.contacts.phone}`}
          size="large"
          disableElevation
          sx={{
            flex: 1, // Ensure equal distribution
            minWidth: '120px', // Prevent becoming too small
            borderRadius: '50px',
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 600,
            bgcolor: '#e3f2fd',
            color: '#1565c0',
            '&:hover': {
              bgcolor: '#bbdefb',
            }
          }}
        >
          {t('call')}
        </Button>
      )}

      <Button
        variant="contained"
        startIcon={<Directions />}
        href={getGoogleMapsUrl()}
        target="_blank"
        rel="noopener noreferrer"
        size="large"
        disableElevation
        sx={{
          flex: 1, // Ensure equal distribution
          minWidth: '120px',
          borderRadius: '50px',
          textTransform: 'none',
          fontSize: '1rem',
          fontWeight: 600,
          bgcolor: '#e3f2fd',
          color: '#1565c0',
          '&:hover': {
            bgcolor: '#bbdefb',
          }
        }}
      >
        {t('directions')}
      </Button>

      <Tooltip title={t('share')}>
        <IconButton
          onClick={handleShare}
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            alignSelf: 'center'
          }}
        >
          <Share />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}
