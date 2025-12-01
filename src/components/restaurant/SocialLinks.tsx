import { Stack, IconButton } from '@mui/material';
import { Instagram, Facebook, YouTube, MusicNote } from '@mui/icons-material';
import { RestaurantSocials } from '@/lib/types';

interface Props {
  socials?: RestaurantSocials;
}

export default function SocialLinks({ socials }: Props) {
  if (!socials) return null;

  return (
    <Stack direction="row" spacing={1} justifyContent="center">
      {socials.instagram && (
        <IconButton href={socials.instagram} target="_blank" color="primary">
          <Instagram />
        </IconButton>
      )}
      {socials.facebook && (
        <IconButton href={socials.facebook} target="_blank" color="primary">
          <Facebook />
        </IconButton>
      )}
      {socials.tiktok && (
        <IconButton href={socials.tiktok} target="_blank" color="primary">
          <MusicNote />
        </IconButton>
      )}
      {socials.youtube && (
        <IconButton href={socials.youtube} target="_blank" color="primary">
          <YouTube />
        </IconButton>
      )}
    </Stack>
  );
}
