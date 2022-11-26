import React, {ComponentType, memo} from 'react';
import {CssBaseline, StyledEngineProvider, ThemeProvider} from '@mui/material';
import ThemeFactory from '../themes/ThemeFactory';
import {flowRight} from 'lodash';
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';
import {LocalizationProvider} from '@mui/x-date-pickers';
import {LanguageUtils} from '../utils/LanguageUtils';

const defaultTheme = ThemeFactory.getDefaultTheme();

const withMui = (Component: ComponentType) => (props: any) => {
  const locale = LanguageUtils.getLanguage();

  return (
    <StyledEngineProvider injectFirst>
      <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale={locale}>
        <ThemeProvider theme={defaultTheme}>
          <CssBaseline />
          <Component {...props} />
        </ThemeProvider>
      </LocalizationProvider>
    </StyledEngineProvider>
  );
};

export default flowRight([memo, withMui]);
