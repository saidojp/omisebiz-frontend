'use client';

import { useState } from 'react';
import { useForm, FormProvider, type DefaultValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import {
  Box,
  Paper,
  Tabs,
  Tab,
  Button,
  Stack,
  Alert,
  CircularProgress,
  Typography,
} from '@mui/material';
import {
  Save,
  Publish,
  Visibility,
} from '@mui/icons-material';
import { restaurantFormSchema, type RestaurantFormData } from '@/lib/validations';
import { defaultHours } from '@/lib/constants';
import api from '@/lib/api';
import type { Restaurant } from '@/lib/types';

import BasicInfoTab from './tabs/BasicInfoTab';
import ContactsTab from './tabs/ContactsTab';
import HoursTab from './tabs/HoursTab';
import AttributesTab from './tabs/AttributesTab';
import MediaTab from './tabs/MediaTab';
import SocialTab from './tabs/SocialTab';
import MenuManager from './MenuManager';

interface RestaurantFormProps {
  restaurant?: Restaurant;
  mode: 'create' | 'edit';
}

export default function RestaurantForm({ restaurant, mode }: RestaurantFormProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const defaultValues: DefaultValues<RestaurantFormData> = restaurant
    ? {
        name: restaurant.name,
        description: restaurant.description || '',
        category: restaurant.category || '',
        priceRange: restaurant.priceRange || undefined,
        contacts: restaurant.contacts || {},
        address: restaurant.address || {},
        location: restaurant.location || null,
        hours: restaurant.hours || defaultHours,
        attributes: restaurant.attributes || {},
        featuredAttributes: restaurant.featuredAttributes || [],
        media: restaurant.media || {},
        socials: restaurant.socials || {},
        menuItems: restaurant.menuItems || [],
        featuredDish: restaurant.featuredDish || undefined,
        isPublished: restaurant.isPublished || false,
      }
    : {
        name: '',
        description: '',
        category: '',
        priceRange: undefined,
        contacts: {},
        address: {},
        location: null,
        hours: defaultHours,
        attributes: {},
        featuredAttributes: [],
        media: {},
        socials: {},
        menuItems: [],
        featuredDish: undefined,
        isPublished: false,
      };

  const methods = useForm<RestaurantFormData>({
    resolver: zodResolver(restaurantFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: RestaurantFormData) => {
    console.log('=== FORM SUBMISSION STARTED ===');
    console.log('Raw form data:', JSON.stringify(data, null, 2));
    
    setLoading(true);
    setError('');
    setSuccess('');

    // Clean data before sending
    const cleanData = (obj: any): any => {
      if (Array.isArray(obj)) {
        return obj.map(cleanData);
      }
      if (obj !== null && typeof obj === 'object') {
        const cleaned: any = {};
        for (const [key, value] of Object.entries(obj)) {
          const cleanedValue = cleanData(value);
          if (cleanedValue !== undefined && cleanedValue !== '' && cleanedValue !== null) {
            cleaned[key] = cleanedValue;
          }
        }
        return Object.keys(cleaned).length > 0 ? cleaned : undefined;
      }
      return obj === '' ? undefined : obj;
    };

    const payload = {
      ...data,
      contacts: cleanData(data.contacts),
      address: cleanData(data.address),
      // Ensure location is either a valid object or undefined (not null)
      location: data.location?.lat && data.location?.lng ? data.location : undefined,
      hours: data.hours, // Hours structure is complex, keep as is
      attributes: cleanData(data.attributes),
      media: cleanData(data.media),
      socials: cleanData(data.socials),
    };

    // Clean up optional string fields
    payload.description = data.description || undefined;
    payload.category = data.category || undefined;
    
    // Explicitly handle priceRange
    // Check if we have valid numbers for min/max
    if (data.priceRange && 
        typeof data.priceRange.min === 'number' && !isNaN(data.priceRange.min) &&
        typeof data.priceRange.max === 'number' && !isNaN(data.priceRange.max)) {
      payload.priceRange = data.priceRange;
    } else {
      payload.priceRange = undefined;
    }
    
    // Explicitly handle featuredDish to ensure it's cleared if removed
    // If undefined/null, send null to backend to clear the field
    payload.featuredDish = (data.featuredDish || null) as any;

    console.log('Cleaned payload:', JSON.stringify(payload, null, 2));
    console.log('Payload size:', JSON.stringify(payload).length, 'bytes');

    try {
      console.log(`Making ${mode.toUpperCase()} request...`);
      
      if (mode === 'create') {
        const response = await api.post('/restaurants', payload);
        console.log('CREATE response:', response.data);
        setSuccess('Restaurant created successfully!');
        setTimeout(() => router.push('/dashboard/restaurants'), 1500);
      } else {
        const response = await api.patch(`/restaurants/${restaurant?.id}`, payload);
        
        // Handle publish status change separately if needed
        if (restaurant && data.isPublished !== restaurant.isPublished) {
          console.log(`Updating publish status to: ${data.isPublished}`);
          if (data.isPublished) {
            await api.patch(`/restaurants/${restaurant.id}/publish`);
          } else {
            await api.patch(`/restaurants/${restaurant.id}/unpublish`);
          }
        }

        console.log('UPDATE response:', response.data);
        setSuccess('Restaurant updated successfully!');
        setTimeout(() => router.push('/dashboard/restaurants'), 1000);
      }
      
      console.log('=== FORM SUBMISSION SUCCESSFUL ===');
    } catch (err: any) {
      console.error('=== FORM SUBMISSION FAILED ===');
      console.error('Error object:', err);
      console.error('Error response:', err.response);
      console.error('Error response data:', err.response?.data);
      console.error('Error response status:', err.response?.status);
      console.error('Error message:', err.message);
      
      // Extract detailed error message
      let errorMessage = 'Failed to save restaurant';
      
      if (err.response?.data) {
        if (typeof err.response.data === 'string') {
          errorMessage = err.response.data;
        } else if (err.response.data.error) {
          if (typeof err.response.data.error === 'string') {
            errorMessage = err.response.data.error;
          } else if (err.response.data.error.message) {
            errorMessage = err.response.data.error.message;
          }
        } else if (err.response.data.message) {
          errorMessage = err.response.data.message;
        }
        
        // Include validation details if available
        if (err.response.data.errors) {
          errorMessage += '\n\nValidation errors:\n' + 
            JSON.stringify(err.response.data.errors, null, 2);
        }
      }
      
      console.error('Extracted error message:', errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
      console.log('=== FORM SUBMISSION ENDED ===');
    }
  };

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleNext = () => {
    if (activeTab < 6) {
      setActiveTab(activeTab + 1);
    }
  };

  const handleBack = () => {
    if (activeTab > 0) {
      setActiveTab(activeTab - 1);
    }
  };

  return (
    <FormProvider {...methods}>
      <Box component="form" onSubmit={methods.handleSubmit(onSubmit)}>
        {/* Success/Error Messages */}
        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {success}
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            <Typography variant="subtitle2" fontWeight="bold" gutterBottom>
              Error
            </Typography>
            <Box component="pre" sx={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', fontSize: '0.875rem', margin: 0 }}>
              {error}
            </Box>
          </Alert>
        )}
        {Object.keys(methods.formState.errors).length > 0 && (
          <Alert severity="error" sx={{ mb: 3 }}>
            <Typography variant="subtitle2" fontWeight="bold">
              Please fix the following errors:
            </Typography>
            <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
              {Object.entries(methods.formState.errors).map(([key, error]) => (
                <li key={key}>
                  {key}: {(error as any)?.message || 'Invalid value'}
                </li>
              ))}
            </ul>
          </Alert>
        )}

        {/* Tabs */}
        <Paper sx={{ mb: 3 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Basic Info" />
            <Tab label="Contacts & Location" />
            <Tab label="Hours" />
            <Tab label="Attributes" />
            <Tab label="Media" />
            <Tab label="Social Media" />
            <Tab label="Menu" />
          </Tabs>
        </Paper>

        {/* Tab Content */}
        <Paper sx={{ p: 3, mb: 3 }}>
          {activeTab === 0 && <BasicInfoTab restaurantId={restaurant?.id} mode={mode} />}
          {activeTab === 1 && <ContactsTab />}
          {activeTab === 2 && <HoursTab />}
          {activeTab === 3 && <AttributesTab />}
          {activeTab === 4 && <MediaTab />}
          {activeTab === 5 && <SocialTab />}
          {activeTab === 6 && (
            <MenuManager
              menuItems={methods.watch('menuItems') || []}
              onChange={(items) => {
                methods.setValue('menuItems', items);
                
                // If the featured dish is no longer in the menu items list, remove it
                const currentFeatured = methods.getValues('featuredDish');
                if (currentFeatured) {
                  let exists = false;
                  if (currentFeatured.menuItemId) {
                    exists = !!items.find((i) => i.id === currentFeatured.menuItemId);
                  } else {
                    // Fallback: check by name and price if ID is missing (legacy data)
                    exists = !!items.find((i) => i.name === currentFeatured.name && i.price === currentFeatured.price);
                  }
                  
                  if (!exists) {
                    methods.setValue('featuredDish', undefined);
                  }
                }
              }}
              onFeaturedChange={(itemId) => {
                const item = (methods.watch('menuItems') || []).find((i: any) => i.id === itemId);
                if (item) {
                  methods.setValue('featuredDish', {
                    menuItemId: item.id,
                    name: item.name,
                    description: item.description,
                    price: item.price,
                    imageUrl: item.imageUrl,
                  });
                } else {
                  methods.setValue('featuredDish', undefined);
                }
              }}
              featuredItemId={methods.watch('featuredDish')?.menuItemId}
            />
          )}
        </Paper>

        {/* Form Actions */}
        <Paper sx={{ p: 2 }}>
          <Stack direction="row" spacing={2} justifyContent="space-between">
              <Button
                variant="outlined"
                onClick={handleBack}
                disabled={activeTab === 0 || loading}
              >
                Back
              </Button>

              {mode === 'edit' && restaurant?.slug && (
                <Button
                  variant="text"
                  color="primary"
                  onClick={() => window.open(`/r/${restaurant.slug}`, '_blank')}
                  startIcon={<Visibility />}
                >
                  View Public Page
                </Button>
              )}

            <Stack direction="row" spacing={2}>
              {mode === 'edit' && (
                <Button
                  type="submit"
                  variant="contained"
                  startIcon={loading ? <CircularProgress size={20} /> : <Save />}
                  disabled={loading}
                >
                  Save Changes
                </Button>
              )}
              
              {activeTab < 6 ? (
                <Button variant="contained" onClick={handleNext} disabled={loading}>
                  Next
                </Button>
              ) : (
                <>
                  {mode === 'create' && (
                    <>
                      <Button
                        type="submit"
                        variant="outlined"
                        startIcon={loading ? <CircularProgress size={20} /> : <Save />}
                        disabled={loading}
                      >
                        Save Draft
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        startIcon={loading ? <CircularProgress size={20} /> : <Save />}
                        disabled={loading}
                      >
                        Create Restaurant
                      </Button>
                    </>
                  )}
                </>
              )}
            </Stack>
          </Stack>
        </Paper>
      </Box>
    </FormProvider>
  );
}
