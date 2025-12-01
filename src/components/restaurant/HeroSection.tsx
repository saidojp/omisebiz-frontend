import { Box, Avatar, Typography, Chip, Container } from '@mui/material';
import { Restaurant } from '@/lib/types';

interface Props {
  restaurant: Restaurant;
}

export default function HeroSection({ restaurant }: Props) {
  const isOpen = () => {
    // Basic check - can be improved with real time logic later
    return true; 
  };

  return (
    <Box sx={{ position: 'relative', mb: 8 }}>
      {/* Cover Image */}
      <Box
        sx={{
          height: { xs: 200, md: 350 },
          width: '100%',
          bgcolor: 'grey.300',
          backgroundImage: `url(${restaurant.media?.cover || ''})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Content Overlay */}
      <Container maxWidth="lg">
        <Box
          sx={{
            position: 'absolute',
            bottom: -40,
            left: 0,
            right: 0,
            px: { xs: 2, md: 0 },
          }}
        >
          <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'flex-end', gap: 3 }}>
            {/* Logo */}
            <Avatar
              src={restaurant.media?.logo}
              alt={restaurant.name}
              sx={{
                width: { xs: 100, md: 150 },
                height: { xs: 100, md: 150 },
                border: '4px solid white',
                boxShadow: 3,
                bgcolor: 'grey.200',
              }}
            />

            {/* Name & Status */}
            <Box sx={{ pb: 1, flexGrow: 1 }}>
              <Typography
                variant="h3"
                component="h1"
                fontWeight="bold"
                sx={{ 
                  color: 'white', 
                  textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                  mb: 1,
                  fontSize: { xs: '2rem', md: '3rem' }
                }}
              >
                {restaurant.name}
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip
                  label={isOpen() ? 'Open Now' : 'Closed'}
                  color={isOpen() ? 'success' : 'error'}
                  size="small"
                />
                {restaurant.category && (
                  <Chip
                    label={restaurant.category}
                    color="primary"
                    size="small"
                    variant="filled"
                  />
                )}
                {restaurant.priceRange && (
                  <Chip
                    label={restaurant.priceRange}
                    size="small"
                    sx={{ bgcolor: 'white' }}
                  />
                )}
              </Box>
            </Box>
          </Container>
        </Box>
      </Container>
    </Box>
  );
}
