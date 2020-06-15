import * as React from 'react';
import {ComponentType, FC, ReactElement, useEffect, useState} from 'react';
import Spinner from '../../components/common/loaders/spinner';
import {Box, Fade} from '@material-ui/core';
import {LOADER_TIMEOUT} from '../../constants';

const withLoader = (Component: ComponentType): FC => (): ReactElement => {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), LOADER_TIMEOUT);
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

export default withLoader;
