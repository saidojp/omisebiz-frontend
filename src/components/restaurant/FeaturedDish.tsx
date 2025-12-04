import { Box, Card, CardContent, CardMedia, Chip, Typography, useTheme } from '@mui/material';
import { Star } from '@mui/icons-material';
import { FeaturedDish as FeaturedDishType } from '@/lib/types';

interface FeaturedDishProps {
  featuredDish: FeaturedDishType;
}

export default function FeaturedDish({ featuredDish }: FeaturedDishProps) {
  const theme = useTheme();

  return (
    <Card
      elevation={0}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 3,
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[4],
        },
        mb: 6,
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, minHeight: 180 }}>
        {/* Image Section */}
        {featuredDish.imageUrl && (
          <Box sx={{ position: 'relative', width: { xs: '100%', md: '40%' } }}>
            <CardMedia
              component="img"
              sx={{
                width: '100%',
                height: '100%',
                minHeight: { xs: 200, md: '100%' },
                objectFit: 'cover',
              }}
              image={featuredDish.imageUrl}
              alt={featuredDish.name}
            />
            {/* Badge overlaid on image */}
            <Chip
              icon={<Star sx={{ color: '#fff !important', fontSize: '1rem !important' }} />}
              label="Recommended"
              size="small"
              sx={{
                position: 'absolute',
                top: 12,
                left: 12,
                bgcolor: 'rgba(0, 0, 0, 0.75)',
                color: '#fff',
                fontWeight: 600,
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            />
          </Box>
        )}

        {/* Content Section */}
        <CardContent 
          sx={{ 
            flex: 1, 
            p: { xs: 2, md: 3 },
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'center',
            bgcolor: 'background.paper'
          }}
        >
          <Typography
            variant="overline"
            color="primary"
            sx={{ fontWeight: 700, letterSpacing: 1.2, mb: 1 }}
          >
            Featured Dish
          </Typography>
          
          <Typography
            variant="h4"
            component="h3"
            gutterBottom
            sx={{ 
              fontWeight: 800, 
              color: 'text.primary',
              lineHeight: 1.2,
              mb: 2
            }}
          >
            {featuredDish.name}
          </Typography>

          {featuredDish.description && (
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                mb: 4,
                lineHeight: 1.7,
                fontSize: '1.05rem'
              }}
            >
              {featuredDish.description}
            </Typography>
          )}

          <Box sx={{ mt: 'auto', display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography
              variant="h4"
              color="primary"
              sx={{
                fontWeight: 700,
              }}
            >
              {featuredDish.price}
            </Typography>
          </Box>
        </CardContent>
      </Box>
    </Card>
  );
}
