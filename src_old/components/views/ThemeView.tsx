import React from 'react';
import {Box} from '@material-ui/core';
import {ColorUtils} from '../../shared/utils/color.utils';
import {ColorScheme} from '../../shared/theme/colors';
import {makeStyles} from '@material-ui/core/styles';

type ThemeViewProps = {
  color: ColorScheme;
};

const ThemeView = ({color}: ThemeViewProps) => {
  const classes = themeSelectStyles();
  const style = {background: ColorUtils.getGradientColor(color)};

  return <Box className={classes.root} style={style} />;
};

const themeSelectStyles = makeStyles(() => ({
  root: {
    width: '100%',
    height: 20,
  },
}));

export default ThemeView;
