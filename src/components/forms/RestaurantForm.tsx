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
import { Save, Publish } from '@mui/icons-material';
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
        priceRange: restaurant.priceRange || '$$',
        contacts: restaurant.contacts || {},
        address: restaurant.address || {},
        location: restaurant.location || null,
        hours: restaurant.hours || defaultHours,
        attributes: restaurant.attributes || {},
        media: restaurant.media || {},
        socials: restaurant.socials || {},
      }
    : {
        name: '',
        description: '',
        category: '',
        priceRange: '$$',
        contacts: {},
        address: {},
        location: null,
        hours: defaultHours,
        attributes: {},
        media: {},
        socials: {},
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
      // Handle top-level optional strings
      description: data.description || undefined,
      category: data.category || undefined,
      priceRange: data.priceRange || undefined,
    };

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
        console.log('UPDATE response:', response.data);
        setSuccess('Restaurant updated successfully!');
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
    if (activeTab < 5) {
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
          </Tabs>
        </Paper>

        {/* Tab Content */}
        <Paper sx={{ p: 3, mb: 3 }}>
          {activeTab === 0 && <BasicInfoTab />}
          {activeTab === 1 && <ContactsTab />}
          {activeTab === 2 && <HoursTab />}
          {activeTab === 3 && <AttributesTab />}
          {activeTab === 4 && <MediaTab />}
          {activeTab === 5 && <SocialTab />}
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

            <Stack direction="row" spacing={2}>
              {activeTab < 5 ? (
                <Button variant="contained" onClick={handleNext} disabled={loading}>
                  Next
                </Button>
              ) : (
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
                    startIcon={loading ? <CircularProgress size={20} /> : <Publish />}
                    disabled={loading}
                  >
                    {mode === 'create' ? 'Create Restaurant' : 'Update Restaurant'}
                  </Button>
                </>
              )}
            </Stack>
          </Stack>
        </Paper>
      </Box>
    </FormProvider>
  );
}
