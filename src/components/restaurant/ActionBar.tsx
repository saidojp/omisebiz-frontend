import { Stack, Button, IconButton, Tooltip } from '@mui/material';
import { Phone, Directions, Language, Share } from '@mui/icons-material';
import { Restaurant } from '@/lib/types';

interface Props {
  restaurant: Restaurant;
}

export default function ActionBar({ restaurant }: Props) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: restaurant.name,
        text: restaurant.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const getGoogleMapsUrl = () => {
    if (restaurant.location) {
      return `https://www.google.com/maps/search/?api=1&query=${restaurant.location.lat},${restaurant.location.lng}`;
    }
    const address = `${restaurant.address?.street}, ${restaurant.address?.city}`;
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
          sx={{ flexGrow: 1 }}
        >
          Call
        </Button>
      )}

      <Button
        variant="outlined"
        startIcon={<Directions />}
        href={getGoogleMapsUrl()}
        target="_blank"
        rel="noopener noreferrer"
        size="large"
        sx={{ flexGrow: 1 }}
      >
        Directions
      </Button>

      {restaurant.contacts?.website && (
        <Button
          variant="outlined"
          startIcon={<Language />}
          href={restaurant.contacts.website}
          target="_blank"
          rel="noopener noreferrer"
          size="large"
          sx={{ flexGrow: 1 }}
        >
          Website
        </Button>
      )}

      <Tooltip title="Share">
        <IconButton 
          onClick={handleShare}
          sx={{ border: '1px solid', borderColor: 'divider' }}
        >
          <Share />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}
