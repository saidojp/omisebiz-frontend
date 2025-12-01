import { Card, CardContent, Typography, Box } from '@mui/material';

interface Props {
  title: string;
  children: React.ReactNode;
}

export default function InfoCard({ title, children }: Props) {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          {title}
        </Typography>
        <Box color="text.secondary">
          {children}
        </Box>
      </CardContent>
    </Card>
  );
}
