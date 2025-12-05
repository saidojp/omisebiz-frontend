'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Chip,
  Skeleton,
  Alert,
  TextField,
  InputAdornment,
  Stack,
  Paper,
  CardActionArea,
} from '@mui/material';
import {
  Search,
  Restaurant as RestaurantIcon,
  LocationOn,
  Storefront,
} from '@mui/icons-material';
import { getPublicRestaurants } from '@/lib/api';
import type { Restaurant } from '@/lib/types';

export default function PublicRestaurantsPage() {
  const router = useRouter();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const data = await getPublicRestaurants();
      setRestaurants(data.data.restaurants || []);
    } catch (err: any) {
      console.error('Failed to fetch public restaurants:', err);
      setError('Failed to load public restaurants. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const filteredRestaurants = restaurants.filter((r) =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
          Restaurants
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Browse restaurants
        </Typography>
      </Box>

      {/* Search */}
      <TextField
        fullWidth
        placeholder="Search restaurants..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Loading State */}
      {loading && (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <Box key={n} sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(33.33% - 16px)' } }}>
              <Card>
                <Skeleton variant="rectangular" height={200} />
                <CardContent>
                  <Skeleton variant="text" height={32} width="80%" />
                  <Skeleton variant="text" height={20} width="60%" />
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      )}

      {/* Empty State */}
      {!loading && restaurants.length === 0 && (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Storefront sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            No published restaurants yet
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Restaurants will appear here once they are published.
          </Typography>
        </Paper>
      )}

      {/* Restaurant Cards */}
{/* Restaurant Cards */}
{!loading && filteredRestaurants.length > 0 && (
  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
    {filteredRestaurants.map((restaurant) => (
      <Box key={restaurant.id} sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(33.33% - 16px)' } }}>
        <Card
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            transition: 'transform 0.2s, box-shadow 0.2s',
            aspectRatio: '1 / 1.1',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: 6,
            },
          }}
        >
          <CardActionArea 
            onClick={() => router.push(`/r/${restaurant.slug}`)}
            sx={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', height: '100%' }}
          >
            {restaurant.media?.cover ? (
              <CardMedia
                component="img"
                sx={{ 
                  width: '100%', 
                  height: '60%', 
                  objectFit: 'cover' 
                }}
                image={restaurant.media.cover}
                alt={restaurant.name}
              />
            ) : (
              <Box
                sx={{
                  width: '100%',
                  height: '60%',
                  bgcolor: 'grey.100',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <RestaurantIcon sx={{ fontSize: 60, color: 'grey.300' }} />
              </Box>
            )}
            <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', py: 2, px: 2.5, height: '40%' }}>
              <Typography variant="h6" component="div" fontWeight="bold" sx={{ fontSize: '1.05rem', mb: 0.5, lineHeight: 1.3 }}>
                {restaurant.name}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                {restaurant.category && (
                  <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.85rem' }}>
                    {restaurant.category}
                  </Typography>
                )}
                {restaurant.priceRange && (
                  <Chip
                    label={restaurant.priceRange}
                    size="small"
                    color="success"
                    variant="outlined"
                    sx={{ height: 20, fontSize: '0.7rem' }}
                  />
                )}
              </Box>
              
              {restaurant.location && (
                <Stack direction="row" spacing={0.5} alignItems="center" sx={{ color: 'text.secondary', mt: 'auto' }}>
                  <LocationOn sx={{ fontSize: 14 }} />
                  <Typography variant="body2" noWrap sx={{ fontSize: '0.8rem' }}>
                    {restaurant.address?.city || 'Location available'}
                  </Typography>
                </Stack>
              )}
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    ))}
  </Box>
)}

      {/* No Search Results */}
      {!loading && restaurants.length > 0 && filteredRestaurants.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" gutterBottom>
            No restaurants found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try a different search term
          </Typography>
        </Box>
      )}
    </Box>
  );
}
