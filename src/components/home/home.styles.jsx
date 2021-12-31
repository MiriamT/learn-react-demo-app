import React from 'react';
import { styled, Box } from '@mui/material';

export const primaryColor = '#08548A';
export const accentColor = '#FC9162';

export const HomeS = styled('div')({
  height: '100vh',
});

export const HeroS = styled('div')({
  height: '600px',
});

export const TextS = styled('div')({
  height: '600px',
});

export const WallpaperS = styled('div')({
  position: 'absolute',
  top: 0,
  left: 0,
  height: '600px',
  width: '100%',
});

export const WallpaperImgS = styled('img')({
  height: '100%',
  width: '100%',
  objectFit: 'cover',
  opacity: 0.8,
});

export const TitleS = styled('div')({
  color: '#FC9162',
  marginTop: '6rem',
  marginBottom: '2rem',
});

export const SectionHeadingS = styled(Box)({
  color: primaryColor,
  marginTop: '6rem',
  marginBottom: '2rem',
});

export const ProfileS = styled('img')({
  width: '100%',
  objectFit: 'cover',
  borderRadius: '5%',
});

export const AboutMiriam = styled('div')({
  display: 'grid',
  gap: '2rem',
  alignItems: 'stretch',
  gridTemplateColumns: '3fr 1fr',
});

export const FooterS = styled('div')({
  marginTop: '10rem',
  borderTop: `1rem solid ${accentColor}`,
  background: primaryColor,
  width: '100%',
  height: '6rem',
});
