import * as React from 'react';
import {ComponentType, FC, ReactElement} from 'react';
import {Box} from '@material-ui/core';
import {wrapperStyles} from './_styles';

const useStyles = wrapperStyles;

const withWrapper = (Component: ComponentType): FC => (props): ReactElement => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Component {...props} />
    </Box>
  );
};

export default withWrapper;
