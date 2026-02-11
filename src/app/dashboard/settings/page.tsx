'use client';

import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Stack,
  Divider,
  Alert,
} from '@mui/material';
import { Save } from '@mui/icons-material';
import { useAuthStore } from '@/lib/store';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function SettingsPage() {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const t = useTranslations('settings');
  const tc = useTranslations('common');

  const handleSave = async () => {
    setLoading(true);
    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSuccess(true);
    setLoading(false);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        {t('title')}
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {t('subtitle')}
      </Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {t('savedSuccess')}
        </Alert>
      )}

      <Paper sx={{ p: 3, maxWidth: 600 }}>
        <Typography variant="h6" gutterBottom>
          {t('accountInfo')}
        </Typography>

        <Stack spacing={3} sx={{ mt: 2 }}>
          <TextField
            label={t('usernameLabel')}
            defaultValue={user?.username}
            fullWidth
            disabled
            helperText={t('usernameHint')}
          />

          <TextField
            label={t('emailLabel')}
            defaultValue={user?.email}
            type="email"
            fullWidth
            disabled
            helperText={t('emailHint')}
          />

          <TextField
            label={t('userIdLabel')}
            defaultValue={user?.uniqueID}
            fullWidth
            disabled
          />
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          {t('password')}
        </Typography>

        <Stack spacing={2} sx={{ mt: 2 }}>
          <TextField
            label={t('currentPassword')}
            type="password"
            fullWidth
            placeholder={t('currentPasswordPlaceholder')}
          />

          <TextField
            label={t('newPassword')}
            type="password"
            fullWidth
            placeholder={t('newPasswordPlaceholder')}
            helperText={t('newPasswordHint')}
          />

          <TextField
            label={t('confirmPassword')}
            type="password"
            fullWidth
            placeholder={t('confirmPasswordPlaceholder')}
          />
        </Stack>

        <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<Save />}
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? t('saving') : t('saveChanges')}
          </Button>
          <Button variant="outlined" disabled={loading}>
            {tc('cancel')}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
