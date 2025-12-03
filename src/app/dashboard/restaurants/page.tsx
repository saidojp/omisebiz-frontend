'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Button,
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
  Stack,
  Paper,
  CircularProgress,
  Tooltip,
} from '@mui/material';
import {
  Add,
  Edit,
  Delete,
  Visibility,
  Search,
  Restaurant as RestaurantIcon,
  LocationOn,
  PhotoCamera,
} from '@mui/icons-material';
import api from '@/lib/api';
import type { Restaurant } from '@/lib/types';

export default function RestaurantsPage() {
  const router = useRouter();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Upload state
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleUploadClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setUploadingId(id);
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !uploadingId) return;

    // Reset input
    e.target.value = '';

    try {
      // 1. Upload image
      const formData = new FormData();
      formData.append('image', file);
      
      // Show loading state on the specific card? 
      // We can use uploadingId to show a spinner on the card.
      
      const uploadRes = await api.post('/api/upload/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const imageUrl = uploadRes.data.data.url;

      // 2. Update restaurant
      const restaurantToUpdate = restaurants.find(r => r.id === uploadingId);
      if (!restaurantToUpdate) return;

      const updatedMedia = {
        ...restaurantToUpdate.media,
        cover: imageUrl
      };

      await api.patch(`/restaurants/${uploadingId}`, {
        media: updatedMedia
      });

      // 3. Update local state
      setRestaurants(restaurants.map(r => 
        r.id === uploadingId 
          ? { ...r, media: updatedMedia }
          : r
      ));

    } catch (err) {
      console.error('Upload failed:', err);
      alert('Failed to upload image');
    } finally {
      setUploadingId(null);
    }
  };

  const filteredRestaurants = restaurants.filter((r) =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      {/* Hidden File Input */}
      <input
        type="file"
        ref={fileInputRef}
        hidden
        accept="image/*"
        onChange={handleFileChange}
      />

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
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {[1, 2, 3, 4].map((n) => (
            <Box key={n} sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)', md: 'calc(33.33% - 16px)' } }}>
              <Card>
                <Skeleton variant="rectangular" height={200} />
                <CardContent>
                  <Skeleton variant="text" height={32} width="80%" />
                  <Skeleton variant="text" height={20} width="60%" />
                  <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                    <Skeleton variant="rectangular" width={60} height={24} />
                    <Skeleton variant="rectangular" width={60} height={24} />
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      )}

      {/* Empty State (when no restaurants exist initially) */}
      {!loading && restaurants.length === 0 && (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="text.secondary">
            No restaurants found
          </Typography>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => router.push('/dashboard/restaurants/new')}
            sx={{ mt: 2 }}
          >
            Create Your First Restaurant
          </Button>
        </Paper>
      )}

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
                  cursor: 'pointer',
                  '&:hover': { boxShadow: 6 },
                  position: 'relative'
                }}
                onClick={() => router.push(`/dashboard/restaurants/${restaurant.id}/edit`)}
              >
                <Box sx={{ position: 'relative', height: 200, bgcolor: 'grey.200' }}>
                  {restaurant.media?.cover ? (
                    <CardMedia
                      component="img"
                      height="200"
                      image={restaurant.media.cover}
                      alt={restaurant.name}
                      sx={{ 
                        opacity: uploadingId === restaurant.id ? 0.5 : 1,
                        objectFit: 'cover'
                      }}
                    />
                  ) : (
                    <Box
                      sx={{
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <RestaurantIcon sx={{ fontSize: 60, color: 'grey.400' }} />
                    </Box>
                  )}
                  
                  {/* Upload Overlay/Button */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: 'rgba(0,0,0,0.3)',
                      opacity: 0,
                      transition: 'opacity 0.2s',
                      '&:hover': { opacity: 1 },
                    }}
                  >
                     <Tooltip title="Change Cover Image">
                      <IconButton 
                        onClick={(e) => handleUploadClick(restaurant.id, e)}
                        sx={{ bgcolor: 'white', '&:hover': { bgcolor: 'grey.100' } }}
                      >
                        <PhotoCamera color="primary" />
                      </IconButton>
                    </Tooltip>
                  </Box>

                  {/* Loading Spinner */}
                  {uploadingId === restaurant.id && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        bgcolor: 'rgba(255,255,255,0.5)',
                      }}
                    >
                      <CircularProgress />
                    </Box>
                  )}
                </Box>

                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="h6" component="div">
                      {restaurant.name}
                    </Typography>
                    {restaurant.priceRange && (
                      <Chip
                        label={restaurant.priceRange}
                        size="small"
                        color="success"
                        variant="outlined"
                      />
                    )}
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {restaurant.category || 'Uncategorized'}
                  </Typography>

                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                    <LocationOn fontSize="small" color="action" />
                    <Typography variant="body2" noWrap>
                      {restaurant.address?.city || 'No location set'}
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                    <Chip
                      label={restaurant.attributes?.wifi ? 'WiFi' : 'No WiFi'}
                      size="small"
                      color={restaurant.attributes?.wifi ? 'primary' : 'default'}
                    />
                    <Chip
                      label={restaurant.attributes?.parking ? 'Parking' : 'No Parking'}
                      size="small"
                      color={restaurant.attributes?.parking ? 'primary' : 'default'}
                    />
                  </Stack>
                </CardContent>
                <CardActions>
                  <Button size="small" onClick={(e) => {
                    e.stopPropagation();
                    window.open(`/r/${restaurant.slug}`, '_blank');
                  }}>
                    View
                  </Button>
                  <Button size="small" onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/dashboard/restaurants/${restaurant.id}/edit`);
                  }}>
                    Edit
                  </Button>
                  <Button size="small" color="error" onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(restaurant.id);
                  }}>
                    Delete
                  </Button>
                </CardActions>
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
