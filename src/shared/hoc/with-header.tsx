import * as React from 'react';
import {ComponentType, FC, ReactElement} from 'react';
import Header from '../../components/layout/header';
import {HEADER_HEIGHT} from '../../components/layout/header/_constants';
import {Box} from '@material-ui/core';

const withHeader = (Component: ComponentType): FC => (props): ReactElement => {
  const headerSpacerStyle = {height: HEADER_HEIGHT};
  return (
    <>
      <Header />
      <Box style={headerSpacerStyle} />
      <Component {...props} />
    </>
  );
};

export default withHeader;
