import * as React from 'react';
import {ComponentType, FC, ReactElement} from 'react';
import {StylesProvider} from '@material-ui/core';

const withStyles = (Component: ComponentType): FC => (props): ReactElement => {
  return (
    <StylesProvider injectFirst>
      <Component {...props} />
    </StylesProvider>
  );
};

export default withStyles;
