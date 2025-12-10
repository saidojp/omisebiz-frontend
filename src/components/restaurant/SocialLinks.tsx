import { Stack, IconButton } from '@mui/material';
import { Instagram, Facebook, YouTube, MusicNote } from '@mui/icons-material';
import { RestaurantSocials } from '@/lib/types';

interface Props {
  socials?: RestaurantSocials;
}

export default function SocialLinks({ socials }: Props) {
  if (!socials) return null;

  return (
    <Stack direction="row" spacing={1}>
      {socials.instagram && (
        <IconButton href={socials.instagram} target="_blank" sx={{ color: 'text.primary' }}>
          <Instagram />
        </IconButton>
      )}
      {socials.facebook && (
        <IconButton href={socials.facebook} target="_blank" sx={{ color: 'text.primary' }}>
          <Facebook />
        </IconButton>
      )}
      {socials.tiktok && (
        <IconButton href={socials.tiktok} target="_blank" sx={{ color: 'text.primary' }}>
          <MusicNote />
        </IconButton>
      )}
      {socials.youtube && (
        <IconButton href={socials.youtube} target="_blank" sx={{ color: 'text.primary' }}>
          <YouTube />
        </IconButton>
      )}
    </Stack>
  );
}
