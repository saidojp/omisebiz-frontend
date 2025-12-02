'use client';

import { useEffect, useState } from 'react';
import { Box, Container, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip, Button, CircularProgress } from '@mui/material';
import api from '@/lib/api';
import { Restaurant } from '@/lib/types';

export default function DebugPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [publicStatuses, setPublicStatuses] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const { data } = await api.get('/restaurants');
      setRestaurants(data.restaurants);
      checkPublicAccess(data.restaurants);
    } catch (error) {
      console.error('Failed to fetch restaurants', error);
    } finally {
      setLoading(false);
    }
  };

  const checkPublicAccess = async (items: Restaurant[]) => {
    const statuses: Record<string, string> = {};
    
    for (const r of items) {
      try {
        await api.get(`/api/public/restaurants/${r.slug}`);
        statuses[r.id] = '✅ 200 OK';
      } catch (err: any) {
        statuses[r.id] = `❌ ${err.response?.status || 'Error'}`;
      }
    }
    setPublicStatuses(statuses);
  };

  if (loading) return <CircularProgress />;

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        🕵️‍♂️ Debug Dashboard
      </Typography>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Slug (Public URL)</TableCell>
              <TableCell>Backend Status</TableCell>
              <TableCell>Public API Check</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {restaurants.map((r) => (
              <TableRow key={r.id}>
                <TableCell>{r.name}</TableCell>
                <TableCell>
                  <Box sx={{ fontFamily: 'monospace', bgcolor: 'grey.100', p: 0.5 }}>
                    {r.slug}
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip 
                    label={r.isPublished ? 'PUBLISHED' : 'DRAFT'} 
                    color={r.isPublished ? 'success' : 'warning'} 
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Typography fontWeight="bold">
                    {publicStatuses[r.id] || 'Checking...'}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Button 
                    size="small" 
                    variant="outlined"
                    onClick={() => window.open(`/r/${r.slug}`, '_blank')}
                  >
                    Open Link
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
