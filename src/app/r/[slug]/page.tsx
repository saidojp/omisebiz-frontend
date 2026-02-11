'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Box, Container, Typography, CircularProgress, Alert, Avatar, Chip, Stack, Button } from '@mui/material';
import { getRestaurantBySlug } from '@/lib/api';
import { Restaurant } from '@/lib/types';
import ActionBar from '@/components/restaurant/ActionBar';
import InfoCard from '@/components/restaurant/InfoCard';
import HoursDisplay from '@/components/restaurant/HoursDisplay';
import PhotoGallery from '@/components/restaurant/PhotoGallery';
import SocialLinks from '@/components/restaurant/SocialLinks';
import FeaturedDish from '@/components/restaurant/FeaturedDish';
import MenuDisplay from '@/components/restaurant/MenuDisplay';
import { ArrowBack } from '@mui/icons-material';
import { ATTRIBUTE_GROUPS } from '@/lib/constants';
import { useTranslations } from 'next-intl';

export default function RestaurantPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  const t = useTranslations('restaurantPublic');
  const tc = useTranslations('common');
  const ta = useTranslations('attributes');

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        console.log('=== STARTING FETCH ===');
        console.log('Fetching restaurant with slug:', slug);

        const data = await getRestaurantBySlug(slug);

        console.log('=== RAW DATA RECEIVED ===');
        console.log('Full response:', data);
        console.log('data.success:', data.success);
        console.log('data.data:', data.data);
        console.log('data.data?.restaurant:', data.data?.restaurant);

        if (data.data?.restaurant) {
          console.log('✅ Found restaurant at data.data.restaurant');
          setRestaurant(data.data.restaurant);
        } else if (data.restaurant) {
          console.log('✅ Found restaurant at data.restaurant');
          setRestaurant(data.restaurant);
        } else {
          console.error('❌ Restaurant not found in response structure');
          console.log('Checked: data.data.restaurant and data.restaurant');
          setError(t('notFound'));
        }
      } catch (err: any) {
        console.error('=== ERROR CAUGHT ===');
        console.error('Full error:', err);
        console.error('Error response:', err.response);
        const errorMessage = err.response?.data?.error || err.message || t('notFound');
        const errorDetails = err.response?.status ? `Status: ${err.response.status}` : '';
        setError(`${errorMessage} ${errorDetails}`);
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
              {t('notFound')}
            </Typography>
            <Typography variant="body2">
              {error || t('notFoundMessage')}
            </Typography>
          </Alert>
        </Box>
      </Container>
    );
  }

  return (
    <Box sx={{ pb: 8, bgcolor: 'common.white', minHeight: '100vh' }}>
      <Container maxWidth="lg" sx={{ pt: 4 }}>
        {/* Navigation */}
        <Box sx={{ mb: 2 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={() => {
              if (window.history.length <= 2) {
                router.push('/dashboard/public-restaurants');
              } else {
                router.back();
              }
            }}
            sx={{
              color: 'text.secondary',
              '&:hover': {
                bgcolor: 'transparent',
                color: 'text.primary',
              }
            }}
          >
            {tc('back')}
          </Button>
        </Box>

        {/* Header Section */}
        <Box sx={{ mb: 6 }}>
          {/* Top Bar: Socials */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 4 }}>
            <SocialLinks socials={restaurant.socials} />
          </Box>

          {/* Identity Section */}
          <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: { xs: 'center', md: 'flex-start' },
            gap: 4,
            textAlign: { xs: 'center', md: 'left' }
          }}>
            {/* Logo */}
            <Avatar
              src={restaurant.media?.logo}
              sx={{
                width: { xs: 120, md: 140 },
                height: { xs: 120, md: 140 },
                border: '1px solid',
                borderColor: 'grey.200',
                bgcolor: 'grey.50'
              }}
            />

            <Box sx={{ flexGrow: 1, pt: { md: 2 }, width: '100%', minWidth: 0 }}>
              <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: 'center',
                justifyContent: { xs: 'center', md: 'flex-start' },
                gap: { xs: 2, md: 3 },
                mb: 2
              }}>
                <Typography
                  variant="h2"
                  component="h1"
                  fontWeight="800"
                  sx={{
                    color: '#212121',
                    fontSize: { xs: '2rem', md: '3rem' },
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                  }}
                >
                  {restaurant.name}
                </Typography>

                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  justifyContent={{ xs: 'center', md: 'flex-start' }}
                  flexWrap="wrap"
                  useFlexGap
                >
                  {restaurant.category && (
                    <Chip
                      label={restaurant.category}
                      size="small"
                      sx={{
                        bgcolor: '#fff3e0',
                        color: '#e65100',
                        fontWeight: 600,
                        borderRadius: '12px',
                      }}
                    />
                  )}

                  <Chip
                    label={t('openNow')}
                    size="small"
                    sx={{
                      bgcolor: '#e8f5e9',
                      color: '#2e7d32',
                      fontWeight: 600,
                      borderRadius: '12px',
                    }}
                  />
                </Stack>
              </Box>

              {/* Amenities */}
              {restaurant.attributes && Object.keys(restaurant.attributes).length > 0 && (
                <Box
                  sx={{
                    mt: 2,
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 1,
                    width: '100%',
                    justifyContent: { xs: 'center', md: 'flex-start' }
                  }}
                >
                  {Object.values(ATTRIBUTE_GROUPS).flatMap((group: any) =>
                    group.items.map((item: any) => {
                      if (restaurant.attributes?.[item.key]) {
                        return (
                          <Chip
                            key={item.key}
                            label={ta(item.key)}
                            size="small"
                            variant="outlined"
                            sx={{
                              borderColor: group.colors?.border || 'grey.300',
                              color: group.colors?.text || 'text.secondary',
                              bgcolor: group.colors?.bg || 'grey.50',
                              fontSize: '0.75rem',
                              height: 26,
                              fontWeight: 500,
                            }}
                          />
                        );
                      }
                      return null;
                    })
                  )}
                </Box>
              )}
            </Box>
          </Box>
        </Box>
        <Box sx={{ mb: 4 }}>
          <ActionBar restaurant={restaurant} />
        </Box>



        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 3, md: 4 } }}>
          {/* Left Column - Main Info */}
          <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 66.666%' } }}>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" gutterBottom fontWeight="bold">
                {t('about')}
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
                {restaurant.description || t('noDescription')}
              </Typography>
            </Box>

            {/* Featured Dish Section */}
            {restaurant.featuredDish && (
              <Box sx={{ mb: 4 }}>
                <FeaturedDish
                  featuredDish={{
                    ...restaurant.featuredDish,
                    description: restaurant.featuredDish.description ||
                      restaurant.menuItems?.find(item => item.id === restaurant.featuredDish?.menuItemId)?.description,
                    price: restaurant.menuItems?.find(item => item.id === restaurant.featuredDish?.menuItemId)?.price || restaurant.featuredDish.price
                  }}
                />
              </Box>
            )}

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" gutterBottom fontWeight="bold">
                {t('gallery')}
              </Typography>
              <PhotoGallery media={restaurant.media} />
            </Box>

            {/* Menu Section */}
            {restaurant.menuItems && restaurant.menuItems.length > 0 && (
              <MenuDisplay menuItems={restaurant.menuItems} />
            )}
          </Box>

          {/* Right Column - Sidebar Info */}
          <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 33.333%' } }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, md: 3 } }}>
              <InfoCard title={t('locationTitle')}>
                <Typography variant="body2" gutterBottom>
                  {restaurant.address?.street}<br />
                  {restaurant.address?.city}, {restaurant.address?.zip}<br />
                  {restaurant.address?.country}
                </Typography>
              </InfoCard>

              <InfoCard title={t('hoursTitle')}>
                <HoursDisplay hours={restaurant.hours} />
              </InfoCard>

              <InfoCard title={t('contactTitle')}>
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
                    🌐 <a href={restaurant.contacts.website} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>{t('websiteLink')}</a>
                  </Typography>
                )}
              </InfoCard>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
