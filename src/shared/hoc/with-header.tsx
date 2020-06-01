import * as React from 'react';
import {ComponentType, FC, ReactElement} from 'react';
import Header from '../../components/header/header';

const withHeader = (Component: ComponentType): FC => (props): ReactElement => {
  return (
    <>
      <Header />
      <Component {...props} />
    </>
  );
};

export default withHeader;
