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

export default function SettingsPage() {
  const { user } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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
        Settings
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Manage your account settings
      </Typography>

      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Settings updated successfully!
        </Alert>
      )}

      <Paper sx={{ p: 3, maxWidth: 600 }}>
        <Typography variant="h6" gutterBottom>
          Account Information
        </Typography>

        <Stack spacing={3} sx={{ mt: 2 }}>
          <TextField
            label="Username"
            defaultValue={user?.username}
            fullWidth
            disabled
            helperText="Username cannot be changed"
          />

          <TextField
            label="Email"
            defaultValue={user?.email}
            type="email"
            fullWidth
            disabled
            helperText="Email cannot be changed"
          />

          <TextField
            label="User ID"
            defaultValue={user?.uniqueID}
            fullWidth
            disabled
          />
        </Stack>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h6" gutterBottom>
          Password
        </Typography>

        <Stack spacing={2} sx={{ mt: 2 }}>
          <TextField
            label="Current Password"
            type="password"
            fullWidth
            placeholder="Enter current password"
          />

          <TextField
            label="New Password"
            type="password"
            fullWidth
            placeholder="6 digits"
            helperText="Password must be exactly 6 digits"
          />

          <TextField
            label="Confirm New Password"
            type="password"
            fullWidth
            placeholder="6 digits"
          />
        </Stack>

        <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            startIcon={<Save />}
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
          <Button variant="outlined" disabled={loading}>
            Cancel
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}
