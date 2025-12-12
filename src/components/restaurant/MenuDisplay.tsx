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

interface MenuDisplayProps {
  menuItems: MenuItem[];
}

export default function MenuDisplay({ menuItems }: MenuDisplayProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  if (!menuItems || menuItems.length === 0) {
    return null;
  }

  // Group menu items by category
  const groupedMenu = menuItems.reduce((acc, item) => {
    const category = item.category || 'Other';
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
          <RestaurantIcon /> Menu
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
        <Accordion key={category} defaultExpanded sx={{ mb: 2 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="h6" fontWeight="600">
                {category}
              </Typography>
              <Chip label={`${groupedMenu[category].length} items`} size="small" />
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
                  <Card key={item.id} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    {item.imageUrl && (
                      <CardMedia
                        component="img"
                        height="140"
                        image={item.imageUrl}
                        alt={item.name}
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
                        <Typography variant="h6" component="h4" sx={{ fontWeight: 600 }}>
                          {item.name}
                        </Typography>
                        <Typography
                          variant="h6"
                          color="primary"
                          sx={{ fontWeight: 'bold', ml: 1 }}
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
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {groupedMenu[category].map((item) => (
                  <Box
                    key={item.id}
                    sx={{
                      display: 'flex',
                      gap: 2,
                      p: 2,
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 1,
                      '&:hover': {
                        backgroundColor: 'action.hover',
                      },
                    }}
                  >
                    {item.imageUrl && (
                      <Box
                        component="img"
                        src={item.imageUrl}
                        alt={item.name}
                        sx={{
                          width: 100,
                          height: 100,
                          objectFit: 'cover',
                          borderRadius: 1,
                          flexShrink: 0,
                        }}
                      />
                    )}
                    <Box sx={{ flex: 1 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          gap: 2, // Explicit gap
                          mb: 0.5,
                        }}
                      >
                        <Typography 
                          variant="h6" 
                          component="h4" 
                          sx={{ 
                            fontWeight: 600, 
                            flex: 1, 
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            wordBreak: 'break-word'
                          }}
                        >
                          {item.name}
                        </Typography>
                        <Typography
                          variant="h6"
                          color="primary"
                          sx={{ 
                            fontWeight: 'bold',
                            whiteSpace: 'nowrap', // Prevent wrapping
                            flexShrink: 0, // Prevent shrinking
                          }}
                        >
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
