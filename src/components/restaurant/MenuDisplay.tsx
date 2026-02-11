'use client';

import { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  ToggleButtonGroup,
  ToggleButton,
  Divider,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  GridView,
  ViewList,
  Restaurant as RestaurantIcon,
} from '@mui/icons-material';
import { MenuItem } from '@/lib/types';
import { useTranslations } from 'next-intl';

interface MenuDisplayProps {
  menuItems: MenuItem[];
}

export default function MenuDisplay({ menuItems }: MenuDisplayProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const t = useTranslations('restaurantPublic');
  const tm = useTranslations('menuManager');

  if (!menuItems || menuItems.length === 0) {
    return null;
  }

  // Group menu items by category
  const groupedMenu = menuItems.reduce((acc, item) => {
    const category = item.category || tm('other');
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  const categories = Object.keys(groupedMenu);

  const handleViewModeChange = (
    event: React.MouseEvent<HTMLElement>,
    newMode: 'grid' | 'list' | null,
  ) => {
    if (newMode !== null) {
      setViewMode(newMode);
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <RestaurantIcon /> {t('menu')}
        </Typography>

        {/* View Mode Toggle */}
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={handleViewModeChange}
          size="small"
          aria-label="view mode"
        >
          <ToggleButton value="list" aria-label="list view">
            <ViewList />
          </ToggleButton>
          <ToggleButton value="grid" aria-label="grid view">
            <GridView />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {/* Menu by Categories */}
      {categories.map((category) => (
        <Accordion key={category} defaultExpanded elevation={0} sx={{ mb: 2, border: '1px solid', borderColor: 'divider', borderRadius: '8px !important', '&:before': { display: 'none' } }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="h6" fontWeight="600">
                {category}
              </Typography>
              <Chip label={tm('items', { count: groupedMenu[category].length })} size="small" variant="outlined" />
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            {viewMode === 'grid' ? (
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                  },
                  gap: 2,
                }}
              >
                {groupedMenu[category].map((item) => (
                  <Card key={item.id} elevation={0} sx={{ height: '100%', display: 'flex', flexDirection: 'column', border: '1px solid', borderColor: 'divider' }}>
                    {item.imageUrl && (
                      <CardMedia
                        component="img"
                        height="140"
                        image={item.imageUrl}
                        alt={item.name}
                        sx={{ objectFit: 'cover' }}
                      />
                    )}
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          mb: 1,
                        }}
                      >
                        <Typography variant="subtitle1" component="div" sx={{ fontWeight: 600, lineHeight: 1.2 }}>
                          {item.name}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          color="primary"
                          sx={{ fontWeight: 'bold', ml: 1, whiteSpace: 'nowrap' }}
                        >
                          {item.price}
                        </Typography>
                      </Box>
                      {item.description && (
                        <Typography variant="body2" color="text.secondary">
                          {item.description}
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </Box>
            ) : (
              <Box>
                {groupedMenu[category].map((item, index) => (
                  <Box
                    key={item.id}
                    sx={{
                      py: 2,
                      display: 'flex',
                      gap: 2,
                      alignItems: 'start',
                      borderBottom: index < groupedMenu[category].length - 1 ? '1px solid' : 'none',
                      borderColor: 'divider'
                    }}
                  >
                    {item.imageUrl && (
                      <Box
                        component="img"
                        src={item.imageUrl}
                        alt={item.name}
                        sx={{ width: 80, height: 80, borderRadius: 1, objectFit: 'cover' }}
                      />
                    )}
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', mb: 0.5 }}>
                        <Typography variant="subtitle1" fontWeight="bold">
                          {item.name}
                        </Typography>
                        <Typography variant="subtitle1" color="primary" fontWeight="bold">
                          {item.price}
                        </Typography>
                      </Box>
                      {item.description && (
                        <Typography variant="body2" color="text.secondary">
                          {item.description}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                ))}
              </Box>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
