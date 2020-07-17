import * as React from 'react';
import {ComponentType, FC, ReactElement} from 'react';
import Header from '../../components/header/header';
import {HEADER_HEIGHT} from '../../components/header/_constants';
import {Box} from '@material-ui/core';

const withHeader = (Component: ComponentType): FC => (props): ReactElement => {
  return (
    <>
      <Header />
      <Box style={{height: HEADER_HEIGHT}} />
      <Component {...props} />
    </>
  );
};

export default withHeader;
