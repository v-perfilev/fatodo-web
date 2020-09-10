import * as React from 'react';
import {ComponentType, FC, ReactElement} from 'react';
import Header from '../../components/layout/header';
import {Box} from '@material-ui/core';
import {HEADER_HEIGHT} from '../../components/layout/header/_constants';

const withFlexibleHeader = (Component: ComponentType): FC => (props): ReactElement => {
  const headerSpacerStyle = {height: HEADER_HEIGHT};
  return (
    <>
      <Header flexible />
      <Box style={headerSpacerStyle} />
      <Component {...props} />
    </>
  );
};

export default withFlexibleHeader;
