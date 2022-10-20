import React from 'react';
import {Box, SxProps, ThemeProvider} from '@mui/material';
import {ColorScheme} from '../../shared/themes/colors';
import ThemeFactory from '../../shared/themes/ThemeFactory';

type ThemeViewProps = {
  color: ColorScheme;
};

const ThemeView = ({color}: ThemeViewProps) => {
  const theme = ThemeFactory.getTheme(color);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={themeStyles} />
    </ThemeProvider>
  );
};

const themeStyles: SxProps = {
  width: '100%',
  height: 30,
  backgroundColor: 'primary.main',
};

export default ThemeView;
