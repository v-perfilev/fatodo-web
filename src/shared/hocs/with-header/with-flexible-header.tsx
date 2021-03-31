import * as React from 'react';
import {ComponentType, FC, ReactElement} from 'react';
import {Box} from '@material-ui/core';
import Header from '../../../components/common/layouts/header';
import {headerStyles} from './_styles';

const withFlexibleHeader = (Component: ComponentType): FC => (props): ReactElement => {
  const classes = headerStyles();
  return (
    <>
      <Header flexible />
      <Box className={classes.spacer} />
      <Component {...props} />
    </>
  );
};

export default withFlexibleHeader;
