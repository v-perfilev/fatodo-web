import React, {ComponentType, memo, useEffect, useState} from 'react';
import {Box, Fade, SxProps} from '@mui/material';
import {LOADER_TIMEOUT} from '../../constants';
import {flowRight} from 'lodash';
import FatodoSpinner from '../../components/loaders/FatodoSpinner';

const withLoader = (Component: ComponentType) => (props: any) => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), LOADER_TIMEOUT);
  }, []);

  return (
    <>
      <Fade in={loading} appear={false}>
        <Box>
          <FatodoSpinner position="fixed" />
        </Box>
      </Fade>
      <Fade in={!loading} timeout={1000}>
        <Box sx={containerStyles}>
          <Component {...props} />
        </Box>
      </Fade>
    </>
  );
};

const containerStyles: SxProps = {
  minHeight: '100%',
  display: 'flex',
  flexGrow: 1,
};

export default flowRight([memo, withLoader]);
