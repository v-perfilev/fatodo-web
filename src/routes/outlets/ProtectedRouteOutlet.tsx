import React from 'react';
import {Outlet} from 'react-router-dom';
import {Box, SxProps} from '@mui/material';
import {HEADER_HEIGHT} from '../../constants';
import Header from '../../components/layouts/header/Header';

const ProtectedRouteOutlet = () => {
  return (
    <Box sx={containerStyles}>
      <Header flexible />
      <Outlet />
    </Box>
  );
};

const containerStyles: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  paddingTop: HEADER_HEIGHT + 'px',
};

export default ProtectedRouteOutlet;
