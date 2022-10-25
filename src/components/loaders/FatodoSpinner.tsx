import React, {CSSProperties} from 'react';
import {Box, SxProps} from '@mui/material';

type FatodoSpinnerProps = {
  position?: 'absolute' | 'fixed';
};

const FatodoSpinner = ({position = 'absolute'}: FatodoSpinnerProps) => {
  return (
    <Box sx={containerStyles}>
      <img style={imageStyles(position)} src={'/spinner.svg'} alt="Fatodo" />
    </Box>
  );
};

const containerStyles: SxProps = {
  position: 'relative',
  display: 'flex',
  flexGrow: 1,
};

const imageStyles = (position: 'absolute' | 'fixed'): CSSProperties => ({
  position,
  top: '50%',
  left: '50%',
  width: position === 'fixed' ? 270 : 200,
  height: position === 'fixed' ? 270 : 200,
  maxWidth: '70%',
  transform: 'translate(-50%, -50%)',
});

export default FatodoSpinner;
