'use client';

import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
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

  const methods = useForm<RestaurantFormData>({
    resolver: zodResolver(restaurantFormSchema),
    defaultValues: restaurant
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
        },
  });

  const onSubmit = async (data: RestaurantFormData) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (mode === 'create') {
        await api.post('/restaurants', data);
        setSuccess('Restaurant created successfully!');
        setTimeout(() => router.push('/dashboard/restaurants'), 1500);
      } else {
        await api.patch(`/restaurants/${restaurant?.id}`, data);
        setSuccess('Restaurant updated successfully!');
      }
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Failed to save restaurant');
    } finally {
      setLoading(false);
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
            {error}
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
