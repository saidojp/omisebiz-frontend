'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Box, Container, Typography, CircularProgress, Alert } from '@mui/material';
import { getRestaurantBySlug } from '@/lib/api';
import { Restaurant } from '@/lib/types';
import HeroSection from '@/components/restaurant/HeroSection';
import ActionBar from '@/components/restaurant/ActionBar';
import InfoCard from '@/components/restaurant/InfoCard';
import HoursDisplay from '@/components/restaurant/HoursDisplay';
import PhotoGallery from '@/components/restaurant/PhotoGallery';
import SocialLinks from '@/components/restaurant/SocialLinks';

export default function RestaurantPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        console.log('Fetching restaurant with slug:', slug);
        const data = await getRestaurantBySlug(slug);
        console.log('Restaurant data:', data);
        
        if (data.data?.restaurant) {
          setRestaurant(data.data.restaurant);
        } else {
          setError('Restaurant not found');
        }
      } catch (err: any) {
        console.error('Error fetching restaurant:', err);
        setError(err.response?.data?.error || 'Failed to load restaurant');
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [slug]);

  if (loading) {
    return (
      <Container>
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error || !restaurant) {
    return (
      <Container>
        <Box
          sx={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Alert severity="error">
            <Typography variant="h6" gutterBottom>
              Restaurant Not Found
            </Typography>
            <Typography variant="body2">
              {error || 'The restaurant you are looking for does not exist or is not published.'}
            </Typography>
          </Alert>
        </Box>
      </Container>
    );
  }

  return (
    <Box sx={{ pb: 8 }}>
      <HeroSection restaurant={restaurant} />
      
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
          {/* Left Column - Main Info */}
          <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 66.666%' } }}>
            <Box sx={{ mb: 4 }}>
              <ActionBar restaurant={restaurant} />
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" gutterBottom fontWeight="bold">
                About
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
                {restaurant.description || 'No description available.'}
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" gutterBottom fontWeight="bold">
                Gallery
              </Typography>
              <PhotoGallery media={restaurant.media} />
            </Box>
          </Box>

          {/* Right Column - Sidebar Info */}
          <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 33.333%' } }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <InfoCard title="Location">
                <Typography variant="body2" gutterBottom>
                  {restaurant.address?.street}<br />
                  {restaurant.address?.city}, {restaurant.address?.zip}<br />
                  {restaurant.address?.country}
                </Typography>
                {/* Map Embed would go here */}
              </InfoCard>

              <InfoCard title="Hours">
                <HoursDisplay hours={restaurant.hours} />
              </InfoCard>

              <InfoCard title="Contact">
                {restaurant.contacts?.phone && (
                  <Typography variant="body2" gutterBottom>
                    📞 {restaurant.contacts.phone}
                  </Typography>
                )}
                {restaurant.contacts?.email && (
                  <Typography variant="body2" gutterBottom>
                    ✉️ {restaurant.contacts.email}
                  </Typography>
                )}
                {restaurant.contacts?.website && (
                  <Typography variant="body2">
                    🌐 <a href={restaurant.contacts.website} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>Website</a>
                  </Typography>
                )}
              </InfoCard>

              <SocialLinks socials={restaurant.socials} />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
