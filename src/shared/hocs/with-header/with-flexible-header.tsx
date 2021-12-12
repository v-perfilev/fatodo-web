import * as React from 'react';
import {ComponentType, FC, ReactElement} from 'react';
import {Box} from '@material-ui/core';
import Header from '../../../components/layouts/header/header';
import {headerStyles} from './_styles';

const withFlexibleHeader = (Component: ComponentType): FC => (props): ReactElement => {
  const classes = headerStyles();
  return (
    <Box className={classes.root}>
      <Header flexible />
      <Component {...props} />
    </Box>
  );
};

export default withFlexibleHeader;
