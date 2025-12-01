'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
  IconButton,
  Skeleton,
  Alert,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Visibility,
  Search,
  Restaurant as RestaurantIcon,
} from '@mui/icons-material';
import api from '@/lib/api';
import type { Restaurant } from '@/lib/types';

export default function RestaurantsPage() {
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
      const response = await api.get('/restaurants');
      setRestaurants(response.data.restaurants || []);
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Failed to load restaurants');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this restaurant?')) return;

    try {
      await api.delete(`/restaurants/${id}`);
      setRestaurants(restaurants.filter((r) => r.id !== id));
    } catch (err: any) {
      alert('Failed to delete restaurant');
    }
  };

  const filteredRestaurants = restaurants.filter((r) =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h4" component="h1" fontWeight="bold">
            My Restaurants
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {restaurants.length} {restaurants.length === 1 ? 'restaurant' : 'restaurants'}
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => router.push('/dashboard/restaurants/new')}
        >
          Add Restaurant
        </Button>
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
        <Grid container spacing={3}>
          {[1, 2, 3, 4].map((n) => (
            <Grid xs={12} sm={6} md={4} key={n}>
              <Card>
                <Skeleton variant="rectangular" height={200} />
                <CardContent>
                  <Skeleton variant="text" height={32} />
                  <Skeleton variant="text" />
                  <Skeleton variant="text" width="60%" />
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Empty State */}
      {!loading && restaurants.length === 0 && (
        <Box
          sx={{
            textAlign: 'center',
            py: 8,
          }}
        >
          <RestaurantIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            No restaurants yet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Create your first restaurant to get started
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => router.push('/dashboard/restaurants/new')}
          >
            Add Restaurant
          </Button>
        </Box>
      )}

      {/* Restaurant Cards */}
      {!loading && filteredRestaurants.length > 0 && (
        <Grid container spacing={3}>
          {filteredRestaurants.map((restaurant) => (
            <Grid xs={12} sm={6} md={4} key={restaurant.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                  },
                }}
              >
                {/* Cover Image */}
                <CardMedia
                  component="div"
                  sx={{
                    height: 200,
                    backgroundColor: 'grey.200',
                    backgroundImage: restaurant.media?.cover
                      ? `url(${restaurant.media.cover})`
                      : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {!restaurant.media?.cover && (
                    <RestaurantIcon sx={{ fontSize: 60, color: 'grey.400' }} />
                  )}
                </CardMedia>

                {/* Content */}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 1 }}>
                    <Typography variant="h6" component="h2" noWrap>
                      {restaurant.name}
                    </Typography>
                    <Chip
                      label={restaurant.isPublished ? 'Published' : 'Draft'}
                      size="small"
                      color={restaurant.isPublished ? 'success' : 'default'}
                    />
                  </Box>

                  {restaurant.category && (
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {restaurant.category}
                    </Typography>
                  )}

                  {restaurant.address?.city && (
                    <Typography variant="body2" color="text.secondary">
                      📍 {restaurant.address.city}
                      {restaurant.address.country && `, ${restaurant.address.country}`}
                    </Typography>
                  )}

                  {restaurant.priceRange && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {restaurant.priceRange}
                    </Typography>
                  )}
                </CardContent>

                {/* Actions */}
                <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                  <Box>
                    <IconButton
                      size="small"
                      onClick={() => router.push(`/r/${restaurant.slug}`)}
                      title="View public page"
                    >
                      <Visibility />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => router.push(`/dashboard/restaurants/${restaurant.id}/edit`)}
                      title="Edit"
                    >
                      <Edit />
                    </IconButton>
                  </Box>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(restaurant.id)}
                    title="Delete"
                  >
                    <Delete />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
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
