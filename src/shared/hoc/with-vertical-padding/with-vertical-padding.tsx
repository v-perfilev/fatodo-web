import * as React from 'react';
import {ComponentType, FC, ReactElement} from 'react';
import {Box} from '@material-ui/core';
import {paddingStyles} from './_styles';

const withVerticalPadding = (Component: ComponentType): FC => (props): ReactElement => {
  const classes = paddingStyles();

  return (
    <Box className={classes.root}>
      <Component {...props} />
    </Box>
  );
};

export default withVerticalPadding;
