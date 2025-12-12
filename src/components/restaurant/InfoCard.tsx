import { Card, CardContent, Typography, Box } from '@mui/material';

interface Props {
  title: string;
  children: React.ReactNode;
}

export default function InfoCard({ title, children }: Props) {
  return (
    <Card elevation={0} sx={{ height: '100%', borderRadius: 4, bgcolor: '#fafafa' }}>
      <CardContent sx={{ p: { xs: 2, md: 3 } }}>
        <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ color: '#424242', mb: 2 }}>
          {title}
        </Typography>
        <Box sx={{ color: '#616161' }}>
          {children}
        </Box>
      </CardContent>
    </Card>
  );
}
