import React, {ComponentType, memo} from 'react';
import {flowRight} from 'lodash';
import {Group} from '../../models/Group';
import {ColorScheme} from '../themes/colors';
import ThemeFactory from '../themes/ThemeFactory';
import {ThemeProvider} from '@mui/material';

type WithThemeProviderProps = any & {
  group?: Group;
  color?: ColorScheme;
};

const withThemeProvider = (Component: ComponentType) => (props: WithThemeProviderProps) => {
  const theme = ThemeFactory.getTheme(props.color || props.group?.color);

  return (
    <ThemeProvider theme={theme}>
      <Component {...props} />
    </ThemeProvider>
  );
};

export default flowRight([memo, withThemeProvider]);
