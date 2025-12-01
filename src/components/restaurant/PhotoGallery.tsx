'use client';

import { useState } from 'react';
import { ImageList, ImageListItem, Dialog, IconButton, Box } from '@mui/material';
import { Close } from '@mui/icons-material';
import { RestaurantMedia } from '@/lib/types';

interface Props {
  media?: RestaurantMedia;
}

export default function PhotoGallery({ media }: Props) {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');

  if (!media?.gallery || media.gallery.length === 0) {
    return null;
  }

  const handleOpen = (img: string) => {
    setSelectedImage(img);
    setOpen(true);
  };

  return (
    <>
      <ImageList variant="masonry" cols={3} gap={8}>
        {media.gallery.map((item, index) => (
          <ImageListItem key={index} sx={{ cursor: 'pointer' }} onClick={() => handleOpen(item)}>
            <img
              src={item}
              alt={`Gallery image ${index + 1}`}
              loading="lazy"
              style={{ borderRadius: 8 }}
            />
          </ImageListItem>
        ))}
      </ImageList>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: { bgcolor: 'transparent', boxShadow: 'none' }
        }}
      >
        <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
          <IconButton
            onClick={() => setOpen(false)}
            sx={{ position: 'absolute', top: -40, right: 0, color: 'white' }}
          >
            <Close />
          </IconButton>
          <img
            src={selectedImage}
            alt="Full size"
            style={{ maxWidth: '100%', maxHeight: '90vh', borderRadius: 8 }}
          />
        </Box>
      </Dialog>
    </>
  );
}
