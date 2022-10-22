import React, {ComponentType, memo} from 'react';
import {CssBaseline, StyledEngineProvider, ThemeProvider} from '@mui/material';
import ThemeFactory from '../themes/ThemeFactory';
import {flowRight} from 'lodash';
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';
import {LocalizationProvider} from '@mui/x-date-pickers';
import i18n from '../i18n';

const defaultTheme = ThemeFactory.getDefaultTheme();

const withMui = (Component: ComponentType) => (props: any) => {
  return (
    <StyledEngineProvider injectFirst>
      <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={i18n.language}>
        <ThemeProvider theme={defaultTheme}>
          <CssBaseline />
          <Component {...props} />
        </ThemeProvider>
      </LocalizationProvider>
    </StyledEngineProvider>
  );
};

export default flowRight([memo, withMui]);
