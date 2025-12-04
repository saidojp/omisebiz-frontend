'use client';

import { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Add, Delete, Edit, Star } from '@mui/icons-material';
import { MenuItem as MenuItemType } from '@/lib/types';

interface MenuManagerProps {
  menuItems: MenuItemType[];
  onChange: (items: MenuItemType[]) => void;
  onFeaturedChange: (itemId: string | null) => void;
  featuredItemId?: string | null;
}

export default function MenuManager({
  menuItems,
  onChange,
  onFeaturedChange,
  featuredItemId,
}: MenuManagerProps) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItemType | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',
  });

  const categories = ['Appetizers', 'Main Course', 'Desserts', 'Beverages', 'Other'];

  const handleOpenDialog = (item?: MenuItemType) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name,
        description: item.description || '',
        price: item.price,
        category: item.category || '',
        imageUrl: item.imageUrl || '',
      });
    } else {
      setEditingItem(null);
      setFormData({
        name: '',
        description: '',
        price: '',
        category: '',
        imageUrl: '',
      });
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingItem(null);
  };

  const handleSaveItem = () => {
    const newItem: MenuItemType = {
      id: editingItem?.id || `menu-${Date.now()}`,
      name: formData.name,
      description: formData.description || undefined,
      price: formData.price,
      category: formData.category || undefined,
      imageUrl: formData.imageUrl || undefined,
    };

    if (editingItem) {
      onChange(menuItems.map((item) => (item.id === editingItem.id ? newItem : item)));
    } else {
      onChange([...menuItems, newItem]);
    }

    handleCloseDialog();
  };

  const handleDeleteItem = (id: string) => {
    onChange(menuItems.filter((item) => item.id !== id));
    if (featuredItemId === id) {
      onFeaturedChange(null);
    }
  };

  const handleSetFeatured = (id: string) => {
    onFeaturedChange(featuredItemId === id ? null : id);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Menu Items</Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => handleOpenDialog()}
        >
          Add Menu Item
        </Button>
      </Box>

      {menuItems.length === 0 ? (
        <Card>
          <CardContent>
            <Typography color="text.secondary" align="center">
              No menu items yet. Add your first menu item!
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <List sx={{ bgcolor: 'background.paper', borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
          {menuItems.map((item) => (
            <ListItem
              key={item.id}
              secondaryAction={
                <Box>
                  <IconButton
                    edge="end"
                    aria-label="set featured"
                    onClick={() => handleSetFeatured(item.id)}
                    sx={{ color: featuredItemId === item.id ? 'warning.main' : 'default' }}
                  >
                    <Star />
                  </IconButton>
                  <IconButton edge="end" aria-label="edit" onClick={() => handleOpenDialog(item)}>
                    <Edit />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteItem(item.id)}>
                    <Delete />
                  </IconButton>
                </Box>
              }
              sx={{
                borderBottom: '1px solid',
                borderColor: 'divider',
                '&:last-child': { borderBottom: 'none' },
              }}
            >
              {item.imageUrl && (
                <Box
                  component="img"
                  src={item.imageUrl}
                  alt={item.name}
                  sx={{
                    width: 60,
                    height: 60,
                    objectFit: 'cover',
                    borderRadius: 1,
                    mr: 2,
                  }}
                />
              )}
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {item.name}
                    </Typography>
                    {featuredItemId === item.id && (
                      <Star fontSize="small" sx={{ color: 'warning.main' }} />
                    )}
                  </Box>
                }
                secondary={
                  <Box>
                    <Typography component="span" variant="body2" color="primary" fontWeight="bold">
                      {item.price}
                    </Typography>
                    {item.category && (
                      <Typography component="span" variant="body2" color="text.secondary" sx={{ ml: 2 }}>
                        • {item.category}
                      </Typography>
                    )}
                    {item.description && (
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                        {item.description}
                      </Typography>
                    )}
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingItem ? 'Edit Menu Item' : 'Add Menu Item'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField
              label="Name *"
              fullWidth
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <TextField
              label="Price *"
              fullWidth
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="e.g., ¥2000, $15.99"
            />
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={formData.category}
                label="Category"
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <MenuItem value="">None</MenuItem>
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
            <TextField
              label="Image URL"
              fullWidth
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              placeholder="https://..."
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleSaveItem}
            variant="contained"
            disabled={!formData.name || !formData.price}
          >
            {editingItem ? 'Save' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
