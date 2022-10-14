import React, {ComponentType, memo} from 'react';
import {CssBaseline, StyledEngineProvider, ThemeProvider} from '@mui/material';
import ThemeFactory from '../themes/ThemeFactory';
import {flowRight} from 'lodash';

const defaultTheme = ThemeFactory.getDefaultTheme();

const withMui = (Component: ComponentType) => (props: any) => {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <Component {...props} />
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default flowRight([memo, withMui]);
