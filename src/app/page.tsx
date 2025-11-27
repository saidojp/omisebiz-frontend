'use client';

import Link from "next/link";
import { Box, Container, Typography, Button, Stack } from "@mui/material";
import { Restaurant, Login, AppRegistration } from "@mui/icons-material";

export default function Home() {
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
          OmiseBiz
        </Typography>
        
        <Typography variant="h5" color="text.secondary" gutterBottom sx={{ mb: 4 }}>
          Restaurant Management Platform
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 6, maxWidth: 600 }}>
          Centralized platform for managing multiple restaurant profiles. 
          Streamline your business with our comprehensive management tools.
        </Typography>
        
        <Stack direction="row" spacing={2}>
          <Button
            component={Link}
            href="/login"
            variant="contained"
            size="large"
            startIcon={<Login />}
          >
            Login
          </Button>
          
          <Button
            component={Link}
            href="/register"
            variant="outlined"
            size="large"
            startIcon={<AppRegistration />}
          >
            Register
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
