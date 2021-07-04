import * as React from 'react';
import {ComponentType, FC, ReactElement, useEffect, useState} from 'react';
import {Box, Fade} from '@material-ui/core';
import {LOADER_TIMEOUT} from '../../../constants';
import {loaderStyles} from './_styles';
import {Spinner} from '../../../components/loaders';

const withLoader = (Component: ComponentType): FC => (props): ReactElement => {
  const classes = loaderStyles();
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
        <Box className={classes.container}>
          <Component {...props} />
        </Box>
      </Fade>
    </>
  );
};

export default withLoader;
