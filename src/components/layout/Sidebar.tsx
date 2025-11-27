'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Restaurant as RestaurantIcon,
  Add as AddIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

const DRAWER_WIDTH = 260;

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const menuItems = [
  {
    text: 'My Restaurants',
    icon: <RestaurantIcon />,
    href: '/dashboard/restaurants',
  },
  {
    text: 'Add Restaurant',
    icon: <AddIcon />,
    href: '/dashboard/restaurants/new',
  },
  {
    text: 'Settings',
    icon: <SettingsIcon />,
    href: '/dashboard/settings',
  },
];

export default function Sidebar({ open, onClose }: SidebarProps) {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleNavigation = (href: string) => {
    router.push(href);
    if (isMobile) {
      onClose();
    }
  };

  const drawerContent = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Logo Section */}
      <Box
        sx={{
          p: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        <RestaurantIcon sx={{ fontSize: 32, color: 'primary.main' }} />
        <Typography variant="h6" fontWeight="bold" color="primary">
          OmiseBiz
        </Typography>
      </Box>

      <Divider />

      {/* Navigation Menu */}
      <List sx={{ flex: 1, pt: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ px: 2, mb: 0.5 }}>
            <ListItemButton
              onClick={() => handleNavigation(item.href)}
              sx={{
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: 'primary.light',
                  color: 'primary.contrastText',
                },
              }}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      {/* Footer */}
      <Box sx={{ p: 2 }}>
        <Typography variant="caption" color="text.secondary">
          © 2025 OmiseBiz
        </Typography>
      </Box>
    </Box>
  );

  if (isMobile) {
    return (
      <Drawer
        anchor="left"
        open={open}
        onClose={onClose}
        sx={{
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
          },
        }}
      >
        {drawerContent}
      </Drawer>
    );
  }

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          borderRight: '1px solid',
          borderColor: 'divider',
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
}
