import { Box, Card, CardContent, CardMedia, Chip, Typography, useTheme } from '@mui/material';
import { Star } from '@mui/icons-material';
import { FeaturedDish as FeaturedDishType } from '@/lib/types';
import { useTranslations } from 'next-intl';

interface FeaturedDishProps {
  featuredDish: FeaturedDishType;
}

export default function FeaturedDish({ featuredDish }: FeaturedDishProps) {
  const theme = useTheme();
  const t = useTranslations('restaurantPublic');

  return (
    <Card
      elevation={0}
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 3,
        overflow: 'hidden',
      }}
    >
      {featuredDish.imageUrl && (
        <CardMedia
          component="img"
          sx={{
            width: { xs: '100%', md: 280 },
            height: { xs: 200, md: 'auto' },
            objectFit: 'cover',
          }}
          image={featuredDish.imageUrl}
          alt={featuredDish.name}
        />
      )}
      <CardContent sx={{ flex: 1, p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <Star sx={{ color: 'warning.main', fontSize: 20 }} />
          <Chip
            label={t('recommended')}
            size="small"
            sx={{
              bgcolor: '#fff8e1',
              color: '#f57f17',
              fontWeight: 600,
              fontSize: '0.7rem',
            }}
          />
        </Box>

        <Typography variant="h6" fontWeight="bold" gutterBottom>
          {featuredDish.name}
        </Typography>

        {featuredDish.description && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {featuredDish.description}
          </Typography>
        )}

        <Typography variant="h6" color="primary" fontWeight="bold">
          {featuredDish.price}
        </Typography>
      </CardContent>
    </Card>
  );
}
