import React, {CSSProperties} from 'react';
import {Box, SxProps} from '@mui/material';

const FatodoSpinner = () => {
  return (
    <Box sx={containerStyles}>
      <img style={imageStyles} src={'/spinner.svg'} alt="Fatodo" />
    </Box>
  );
};

const containerStyles: SxProps = {
  position: 'relative',
  display: 'flex',
  flexGrow: 1,
};

const imageStyles: CSSProperties = {
  width: 270,
  height: 270,
  maxWidth: '70%',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
};

export default FatodoSpinner;
