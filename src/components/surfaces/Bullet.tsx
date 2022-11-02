import React from 'react';
import withThemeProvider from '../../shared/hocs/withThemeProvider';
import {flowRight} from 'lodash';
import {Box, SxProps} from '@mui/material';
import {Theme} from '@mui/material/styles';
import {ColorScheme} from '../../shared/themes/colors';

type BulletProps = {
  color?: ColorScheme;
  size?: number;
  fullWidth?: boolean;
};

const Bullet = ({color, size = 3, fullWidth}: BulletProps) => {
  return <Box sx={boxStyles(color, size, fullWidth)} />;
};

const boxStyles = (color: ColorScheme, size: number, fullWidth: boolean): SxProps => (theme: Theme) => ({
  width: fullWidth ? '100%' : size,
  height: size,
  background: color ? theme.palette.gradient : theme.palette.grey['500'],
  borderRadius: 3,
});

export default flowRight([withThemeProvider])(Bullet);
