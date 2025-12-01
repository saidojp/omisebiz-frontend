import { Box } from '@mui/material';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
      {children}
    </Box>
  );
}
