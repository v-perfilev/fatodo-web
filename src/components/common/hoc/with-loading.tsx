import * as React from 'react';
import {ComponentType, FC, ReactElement, useEffect, useState} from 'react';
import Spinner from '../loaders/spinner';
import {Box, Fade} from '@material-ui/core';

const withLoading = (Component: ComponentType): FC => (): ReactElement => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  return (
    <>
      <Fade in={loading} appear={false}>
        <Box>
          <Spinner />
        </Box>
      </Fade>
      <Fade in={!loading} timeout={1000}>
        <Box>
          <Component />
        </Box>
      </Fade>
    </>
  );
};

export default withLoading;
