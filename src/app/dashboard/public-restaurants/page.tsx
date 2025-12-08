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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from '@mui/material';
import {
  Search,
  Restaurant as RestaurantIcon,
  LocationOn,
  Storefront,
  FilterList,
  Clear,
} from '@mui/icons-material';
import { getPublicRestaurants } from '@/lib/api';
import type { Restaurant } from '@/lib/types';

export default function PublicRestaurantsPage() {
  const router = useRouter();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');

  // Derived state for filter options
  const categories = Array.from(new Set(restaurants.map(r => r.category).filter(Boolean))) as string[];
  const locations = Array.from(new Set(restaurants.map(r => r.address?.city).filter(Boolean))) as string[];
  const prices = Array.from(new Set(restaurants.map(r => r.priceRange).filter(Boolean))) as string[];

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

  const filteredRestaurants = restaurants.filter((r) => {
    const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? r.category === selectedCategory : true;
    const matchesLocation = selectedLocation ? r.address?.city === selectedLocation : true;
    const matchesPrice = selectedPrice ? r.priceRange === selectedPrice : true;

    return matchesSearch && matchesCategory && matchesLocation && matchesPrice;
  });

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedLocation('');
    setSelectedPrice('');
  };

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
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center' }}>
          <Box sx={{ flex: { xs: '1 1 100%', md: '3' }, minWidth: { md: 240 } }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Search restaurants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          
          <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 30%', md: '2' } }}>
            <FormControl fullWidth size="small">
              <InputLabel>Category</InputLabel>
              <Select
                value={selectedCategory}
                label="Category"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <MenuItem value=""><em>All</em></MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 30%', md: '2' } }}>
            <FormControl fullWidth size="small">
              <InputLabel>Location</InputLabel>
              <Select
                value={selectedLocation}
                label="Location"
                onChange={(e) => setSelectedLocation(e.target.value)}
              >
                <MenuItem value=""><em>All</em></MenuItem>
                {locations.map((loc) => (
                  <MenuItem key={loc} value={loc}>{loc}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ flex: { xs: '1 1 100%', sm: '1 1 30%', md: '2' } }}>
            <FormControl fullWidth size="small">
              <InputLabel>Price</InputLabel>
              <Select
                value={selectedPrice}
                label="Price"
                onChange={(e) => setSelectedPrice(e.target.value)}
              >
                <MenuItem value=""><em>All</em></MenuItem>
                {prices.map((price) => (
                  <MenuItem key={price} value={price}>{price}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {(selectedCategory || selectedLocation || selectedPrice || searchQuery) && (
            <Box sx={{ flex: { xs: '1 1 100%', md: 'auto' }, width: { md: 'auto' } }}>
              <Button 
                variant="outlined" 
                color="inherit" 
                startIcon={<Clear />} 
                onClick={clearFilters}
                fullWidth
              >
                Clear
              </Button>
            </Box>
          )}
        </Box>
      </Paper>

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
