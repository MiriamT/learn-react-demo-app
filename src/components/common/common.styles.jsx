import React from 'react';
import { styled, Box } from '@mui/material';

export const primaryColor = '#08548A';
export const accentColor = '#FC9162';

export const TitleS = styled('div')({
  color: '#FC9162',
  marginTop: '6rem',
  marginBottom: '2rem',
});

export const FooterS = styled(Box)({
  marginTop: '10rem',
  borderTop: `1rem solid ${accentColor}`,
  background: primaryColor,
  width: '100%',
  height: '6rem',
});
