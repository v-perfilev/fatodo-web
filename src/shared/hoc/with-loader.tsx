import * as React from 'react';
import {ComponentType, FC, ReactElement, useEffect, useState} from 'react';
import Spinner from '../components/loaders/spinner';
import {Box, Fade} from '@material-ui/core';
import {LOADER_TIMEOUT} from '../../constants';
import {flexStyles} from './_styles';

const withLoader = (Component: ComponentType): FC => (props): ReactElement => {
  const classes = flexStyles();
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
