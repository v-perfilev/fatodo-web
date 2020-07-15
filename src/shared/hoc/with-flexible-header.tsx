import * as React from 'react';
import {ComponentType, FC, ReactElement} from 'react';
import Header from '../../components/header/header';
import {Toolbar} from '@material-ui/core';

const withFlexibleHeader = (Component: ComponentType): FC => (props): ReactElement => {
  return (
    <>
      <Header flexible />
      <Toolbar />
      <Component {...props} />
    </>
  );
};

export default withFlexibleHeader;
