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
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 3,
        overflow: 'hidden',
        mb: 6,
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[4],
        },
        height: { md: 320 } // Fixed height on desktop ensures image containment
      }}
    >
      {/* Image Section - Strict Dimensions */}
      {featuredDish.imageUrl && (
        <Box 
          sx={{ 
            position: 'relative', 
            width: { xs: '100%', md: '45%' },
            minWidth: { md: 300 }, // Ensure it doesn't get too small
            height: { xs: 250, md: '100%' }, // Fixed height on mobile, full height on desktop
            flexShrink: 0,
          }}
        >
          <CardMedia
            component="img"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover', // Critical: crops image instead of stretching
            }}
            image={featuredDish.imageUrl}
            alt={featuredDish.name}
          />
          
          {/* Badge */}
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
          p: { xs: 2, md: 4 },
          display: 'flex', 
          flexDirection: 'column',
          bgcolor: 'background.paper',
          overflow: 'hidden' // Prevents content from breaking out
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
            mb: 2,
            display: '-webkit-box',
            WebkitLineClamp: 2, // Limit title to 2 lines
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {featuredDish.name}
        </Typography>

        {featuredDish.description && (
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              mb: 2, // Standard margin instead of auto
              lineHeight: 1.7,
              fontSize: '1.05rem',
              whiteSpace: 'pre-line',
              // Line clamping
              display: '-webkit-box',
              WebkitLineClamp: 4, 
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
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
    </Card>
  );
}
