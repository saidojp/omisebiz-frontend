'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Box, Container, Typography, Button, Stack } from "@mui/material";
import { Restaurant, Login, AppRegistration, PersonOutline } from "@mui/icons-material";
import { useAuthStore } from "@/lib/store";

export default function Home() {
  const router = useRouter();
  const { setGuestMode } = useAuthStore();

  const handleGuestMode = () => {
    setGuestMode();
    router.push('/dashboard/public-restaurants');
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Restaurant sx={{ fontSize: 80, color: "primary.main", mb: 2 }} />
        
        <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
          Y
        </Typography>
        
        <Typography variant="h5" color="text.secondary" gutterBottom sx={{ mb: 4 }}>
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 6, maxWidth: 600 }}>
         
        </Typography>
        
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ width: { xs: '100%', sm: 'auto' } }}>
          <Button
            component={Link}
            href="/login"
            variant="contained"
            size="large"
            startIcon={<Login />}
            sx={{ minWidth: 160 }}
          >
            Login
          </Button>
          
          <Button
            component={Link}
            href="/register"
            variant="outlined"
            size="large"
            startIcon={<AppRegistration />}
            sx={{ minWidth: 160 }}
          >
            Register
          </Button>

          <Button
            onClick={handleGuestMode}
            variant="text"
            size="large"
            startIcon={<PersonOutline />}
            sx={{ minWidth: 160 }}
          >
            Continue as Guest
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
