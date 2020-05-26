import * as React from 'react';
import {ComponentType, FC, ReactElement} from 'react';
import {Box} from '@material-ui/core';
import {appWrapperStyles} from './_styles';

const useStyles = appWrapperStyles;

const withAppWrapper = (Component: ComponentType): FC => (): ReactElement => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Component />
    </Box>
  );
};

export default withAppWrapper;
