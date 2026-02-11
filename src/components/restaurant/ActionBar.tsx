import { Stack, Button, IconButton, Tooltip } from '@mui/material';
import { Phone, Directions, Language, Share } from '@mui/icons-material';
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

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={{
        flexWrap: 'wrap',
        gap: 1,
      }}
    >
      {restaurant.contacts?.phone && (
        <Button
          variant="outlined"
          size="small"
          startIcon={<Phone />}
          href={`tel:${restaurant.contacts.phone}`}
          sx={{ borderRadius: 2 }}
        >
          {t('call')}
        </Button>
      )}

      {restaurant.location && (
        <Button
          variant="outlined"
          size="small"
          startIcon={<Directions />}
          href={`https://www.google.com/maps?q=${restaurant.location.lat},${restaurant.location.lng}`}
          target="_blank"
          sx={{ borderRadius: 2 }}
        >
          {t('directions')}
        </Button>
      )}

      {restaurant.contacts?.website && (
        <Button
          variant="outlined"
          size="small"
          startIcon={<Language />}
          href={restaurant.contacts.website}
          target="_blank"
          sx={{ borderRadius: 2 }}
        >
          {t('websiteLink')}
        </Button>
      )}

      <Button
        variant="outlined"
        size="small"
        startIcon={<Share />}
        onClick={handleShare}
        sx={{ borderRadius: 2 }}
      >
        {t('share')}
      </Button>
    </Stack>
  );
}
