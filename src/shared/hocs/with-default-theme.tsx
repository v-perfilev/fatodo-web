import * as React from 'react';
import {ComponentType, FC, ReactElement} from 'react';
import {ThemeProvider} from '@material-ui/core';
import {ThemeFactory} from '../theme/theme';

const withDefaultTheme = (Component: ComponentType): FC => (props): ReactElement => {
  const defaultTheme = ThemeFactory.getDefaultTheme();

  return (
    <ThemeProvider theme={defaultTheme}>
      <Component {...props} />
    </ThemeProvider>
  );
};

export default withDefaultTheme;
