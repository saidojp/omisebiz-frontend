'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Box,
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Stack,
  Divider,
} from '@mui/material';
import { Login as LoginIcon, Restaurant, PersonOutline } from '@mui/icons-material';
import api from '@/lib/api';
import { useAuthStore } from '@/lib/store';
import { loginSchema, type LoginFormData } from '@/lib/validations';
import type { AuthResponse } from '@/lib/types';
import { useTranslations } from 'next-intl';

export default function LoginPage() {
  const router = useRouter();
  const { setAuth, setGuestMode } = useAuthStore();
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations('auth');
  const tc = useTranslations('common');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await api.post<AuthResponse>('/auth/login', data);
      const { token, user } = response.data;

      // Save auth state
      setAuth(user, token);

      // Redirect to dashboard
      router.push('/dashboard');
    } catch (err: any) {
      const message = err.response?.data?.error?.message || t('loginFailed');
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = () => {
    setGuestMode();
    router.push('/dashboard/public-restaurants');
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: '100%',
            borderRadius: 2,
          }}
        >
          {/* Logo & Title */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Restaurant sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
            <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom>
              {t('welcomeBack')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {t('signInSubtitle')}
            </Typography>
          </Box>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
              <TextField
                {...register('email')}
                label={t('emailLabel')}
                type="email"
                fullWidth
                error={!!errors.email}
                helperText={errors.email?.message}
                disabled={isLoading}
                autoComplete="email"
                autoFocus
              />

              <TextField
                {...register('password')}
                label={t('passwordLabel')}
                type="password"
                fullWidth
                error={!!errors.password}
                helperText={errors.password?.message || t('passwordHint')}
                disabled={isLoading}
                autoComplete="current-password"
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={isLoading}
                startIcon={isLoading ? <CircularProgress size={20} /> : <LoginIcon />}
              >
                {isLoading ? t('signingIn') : t('signIn')}
              </Button>
            </Stack>
          </form>

          {/* Divider */}
          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="text.secondary">
              {tc('or')}
            </Typography>
          </Divider>

          {/* Register Link */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              {t('noAccount')}{' '}
              <Link href="/register" style={{ color: 'inherit', fontWeight: 600 }}>
                {t('signUp')}
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
