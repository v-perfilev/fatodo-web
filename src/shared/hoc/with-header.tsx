import * as React from 'react';
import {ComponentType, FC, ReactElement} from 'react';
import {HEADER_HEIGHT} from '../../components/common/layouts/header/_constants';
import {Box} from '@material-ui/core';
import {Header} from '../../components/common/layouts/header';

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
