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
  Button,
  ToggleButtonGroup,
  ToggleButton,
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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const t = useTranslations('restaurantPublic');
  const tm = useTranslations('menuManager');

  // Group items by category
  const groupedItems = menuItems.reduce((acc, item) => {
    const category = item.category || tm('other');
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">
          {t('menu')}
        </Typography>
        <ToggleButtonGroup
          value={viewMode}
          exclusive
          onChange={(_, value) => value && setViewMode(value)}
          size="small"
        >
          <ToggleButton value="grid">
            <GridView fontSize="small" />
          </ToggleButton>
          <ToggleButton value="list">
            <ViewList fontSize="small" />
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      {Object.entries(groupedItems).map(([category, items]) => (
        <Accordion key={category} defaultExpanded elevation={0} sx={{ border: '1px solid', borderColor: 'divider', mb: 1, borderRadius: '8px !important', '&:before': { display: 'none' } }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <RestaurantIcon fontSize="small" color="action" />
              <Typography fontWeight="bold">{category}</Typography>
              <Chip label={tm('items', { count: items.length })} size="small" variant="outlined" sx={{ ml: 1 }} />
            </Box>
          </AccordionSummary>
          <AccordionDetails>
            {viewMode === 'grid' ? (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {items.map((item) => (
                  <Box key={item.id} sx={{ width: { xs: '100%', sm: 'calc(50% - 8px)' } }}>
                    <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', height: '100%' }}>
                      {item.imageUrl && (
                        <CardMedia
                          component="img"
                          height="140"
                          image={item.imageUrl}
                          alt={item.name}
                          sx={{ objectFit: 'cover' }}
                        />
                      )}
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <Typography variant="subtitle1" fontWeight="bold">
                            {item.name}
                          </Typography>
                          <Typography variant="subtitle1" color="primary" fontWeight="bold" sx={{ ml: 2, whiteSpace: 'nowrap' }}>
                            {item.price}
                          </Typography>
                        </Box>
                        {item.description && (
                          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                            {item.description}
                          </Typography>
                        )}
                      </CardContent>
                    </Card>
                  </Box>
                ))}
              </Box>
            ) : (
              <Box>
                {items.map((item, index) => (
                  <Box key={item.id} sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1.5, borderBottom: index < items.length - 1 ? '1px solid' : 'none', borderColor: 'divider' }}>
                    {item.imageUrl && (
                      <Box
                        component="img"
                        src={item.imageUrl}
                        alt={item.name}
                        sx={{ width: 60, height: 60, borderRadius: 1, objectFit: 'cover' }}
                      />
                    )}
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="subtitle2" fontWeight="bold">
                        {item.name}
                      </Typography>
                      {item.description && (
                        <Typography variant="body2" color="text.secondary" noWrap>
                          {item.description}
                        </Typography>
                      )}
                    </Box>
                    <Typography variant="subtitle2" color="primary" fontWeight="bold">
                      {item.price}
                    </Typography>
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
