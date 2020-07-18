import * as React from 'react';
import {ComponentType, FC, ReactElement} from 'react';
import Header from '../../components/header/header';
import {HEADER_HEIGHT} from '../../components/header/_constants';
import {Box} from '@material-ui/core';

const withHeader = (Component: ComponentType): FC => (props): ReactElement => {
  const headerStyle = {height: HEADER_HEIGHT};
  return (
    <>
      <Header />
      <Box style={headerStyle} />
      <Component {...props} />
    </>
  );
};

export default withHeader;
