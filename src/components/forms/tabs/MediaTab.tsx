'use client';

import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import {
  Stack,
  Typography,
  Box,
  Button,
  TextField,
  Grid,
  Card,
  CardMedia,
  IconButton,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Upload, Delete, Image as ImageIcon } from '@mui/icons-material';
import api from '@/lib/api';
import type { RestaurantFormData } from '@/lib/validations';

export default function MediaTab() {
  const { watch, setValue } = useFormContext<RestaurantFormData>();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const logo = watch('media.logo');
  const cover = watch('media.cover');
  const gallery = watch('media.gallery') || [];

  const handleUpload = async (file: File, field: 'logo' | 'cover' | 'gallery') => {
    setUploading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await api.post('/api/upload/image', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const url = response.data.data.url;

      if (field === 'gallery') {
        setValue('media.gallery', [...gallery, url]);
      } else {
        setValue(`media.${field}`, url);
      }
    } catch (err: any) {
      setError('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveGalleryImage = (index: number) => {
    const newGallery = gallery.filter((_, i) => i !== index);
    setValue('media.gallery', newGallery);
  };

  return (
    <Stack spacing={4}>
      <Typography variant="h6" gutterBottom>
        Restaurant Media
      </Typography>

      {error && (
        <Alert severity="error" onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {/* Logo */}
      <Box>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Logo (Square Image)
        </Typography>
        {logo ? (
          <Box sx={{ position: 'relative', width: 200, height: 200 }}>
            <Card>
              <CardMedia
                component="img"
                image={logo}
                alt="Logo"
                sx={{ width: 200, height: 200, objectFit: 'cover' }}
              />
            </Card>
            <IconButton
              size="small"
              color="error"
              onClick={() => setValue('media.logo', '')}
              sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'white' }}
            >
              <Delete />
            </IconButton>
          </Box>
        ) : (
          <Button
            variant="outlined"
            component="label"
            startIcon={uploading ? <CircularProgress size={20} /> : <Upload />}
            disabled={uploading}
          >
            Upload Logo
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleUpload(file, 'logo');
              }}
            />
          </Button>
        )}
      </Box>

      {/* Cover Image */}
      <Box>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Cover Image (Wide Image)
        </Typography>
        {cover ? (
          <Box sx={{ position: 'relative', maxWidth: 600 }}>
            <Card>
              <CardMedia
                component="img"
                image={cover}
                alt="Cover"
                sx={{ width: '100%', height: 300, objectFit: 'cover' }}
              />
            </Card>
            <IconButton
              size="small"
              color="error"
              onClick={() => setValue('media.cover', '')}
              sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'white' }}
            >
              <Delete />
            </IconButton>
          </Box>
        ) : (
          <Button
            variant="outlined"
            component="label"
            startIcon={uploading ? <CircularProgress size={20} /> : <Upload />}
            disabled={uploading}
          >
            Upload Cover Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleUpload(file, 'cover');
              }}
            />
          </Button>
        )}
      </Box>

      {/* Gallery */}
      <Box>
        <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
          Photo Gallery
        </Typography>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          {gallery.map((url, index) => (
            <Grid item xs={6} sm={4} md={3} key={index}>
              <Box sx={{ position: 'relative' }}>
                <Card>
                  <CardMedia
                    component="img"
                    image={url}
                    alt={`Gallery ${index + 1}`}
                    sx={{ height: 150, objectFit: 'cover' }}
                  />
                </Card>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => handleRemoveGalleryImage(index)}
                  sx={{ position: 'absolute', top: 4, right: 4, bgcolor: 'white' }}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </Box>
            </Grid>
          ))}
        </Grid>

        <Button
          variant="outlined"
          component="label"
          startIcon={uploading ? <CircularProgress size={20} /> : <ImageIcon />}
          disabled={uploading}
        >
          Add Photos
          <input
            type="file"
            hidden
            accept="image/*"
            multiple
            onChange={(e) => {
              const files = Array.from(e.target.files || []);
              files.forEach((file) => handleUpload(file, 'gallery'));
            }}
          />
        </Button>
      </Box>
    </Stack>
  );
}
