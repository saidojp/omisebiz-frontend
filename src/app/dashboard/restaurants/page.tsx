import { Box, Container, Typography } from '@mui/material';

export default function RestaurantsPage() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Restaurants
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Restaurant list coming soon...
        </Typography>
      </Box>
    </Container>
  );
}
