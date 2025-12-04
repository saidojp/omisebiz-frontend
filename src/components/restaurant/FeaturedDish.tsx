'use client';

import { Box, Card, CardContent, CardMedia, Chip, Typography } from '@mui/material';
import { Star } from '@mui/icons-material';
import { FeaturedDish as FeaturedDishType } from '@/lib/types';

interface FeaturedDishProps {
  featuredDish: FeaturedDishType;
}

export default function FeaturedDish({ featuredDish }: FeaturedDishProps) {
  return (
    <Card
      sx={{
        position: 'relative',
        overflow: 'visible',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        mb: 4,
      }}
    >
      {/* Recommended Badge */}
      <Box
        sx={{
          position: 'absolute',
          top: -12,
          right: 16,
          zIndex: 1,
        }}
      >
        <Chip
          icon={<Star sx={{ color: '#FFD700 !important' }} />}
          label="Recommended"
          sx={{
            bgcolor: '#FFD700',
            color: '#000',
            fontWeight: 'bold',
            fontSize: '0.875rem',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          }}
        />
      </Box>

      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
        {/* Image */}
        {featuredDish.imageUrl && (
          <CardMedia
            component="img"
            sx={{
              width: { xs: '100%', sm: 200 },
              height: { xs: 200, sm: 200 },
              objectFit: 'cover',
            }}
            image={featuredDish.imageUrl}
            alt={featuredDish.name}
          />
        )}

        {/* Content */}
        <CardContent sx={{ flex: 1, p: 3 }}>
          <Typography
            variant="h5"
            component="h3"
            gutterBottom
            sx={{ fontWeight: 'bold', color: 'white' }}
          >
            {featuredDish.name}
          </Typography>

          {featuredDish.description && (
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255, 255, 255, 0.9)',
                mb: 2,
                lineHeight: 1.6,
              }}
            >
              {featuredDish.description}
            </Typography>
          )}

          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              color: '#FFD700',
              mt: 'auto',
            }}
          >
            {featuredDish.price}
          </Typography>
        </CardContent>
      </Box>
    </Card>
  );
}
