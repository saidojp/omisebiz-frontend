import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Box, Container, Typography, Alert, CircularProgress } from '@mui/material';
import { getRestaurantBySlug } from '@/lib/api';
import HeroSection from '@/components/restaurant/HeroSection';
import ActionBar from '@/components/restaurant/ActionBar';
import InfoCard from '@/components/restaurant/InfoCard';
import HoursDisplay from '@/components/restaurant/HoursDisplay';
import PhotoGallery from '@/components/restaurant/PhotoGallery';
import SocialLinks from '@/components/restaurant/SocialLinks';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const data = await getRestaurantBySlug(params.slug);
    const restaurant = data.data.restaurant;

    return {
      title: `${restaurant.name} | OmiseBiz`,
      description: restaurant.description || `Visit ${restaurant.name}`,
      openGraph: {
        title: restaurant.name,
        description: restaurant.description,
        images: restaurant.media?.cover ? [restaurant.media.cover] : [],
      },
    };
  } catch (error) {
    return {
      title: 'Restaurant Not Found',
    };
  }
}

export default async function RestaurantPage({ params }: Props) {
  let restaurant;

  try {
    const data = await getRestaurantBySlug(params.slug);
    restaurant = data.data.restaurant;
  } catch (error) {
    notFound();
  }

  if (!restaurant) {
    notFound();
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
