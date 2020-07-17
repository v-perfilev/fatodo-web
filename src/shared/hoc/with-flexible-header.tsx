import * as React from 'react';
import {ComponentType, FC, ReactElement} from 'react';
import Header from '../../components/header/header';
import {Box} from '@material-ui/core';
import {HEADER_HEIGHT} from '../../components/header/_constants';

const withFlexibleHeader = (Component: ComponentType): FC => (props): ReactElement => {
  return (
    <>
      <Header flexible />
      <Box style={{height: HEADER_HEIGHT}} />
      <Component {...props} />
    </>
  );
};

export default withFlexibleHeader;
