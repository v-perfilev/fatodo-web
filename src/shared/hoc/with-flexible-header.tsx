import * as React from 'react';
import {ComponentType, FC, ReactElement} from 'react';
import {Box} from '@material-ui/core';
import {HEADER_HEIGHT} from '../../components/common/layouts/header/_constants';
import {Header} from '../../components/common/layouts/header';

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
