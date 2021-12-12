import * as React from 'react';
import {FC} from 'react';
import {themeSelectStyles} from './_styles';
import {Box} from '@material-ui/core';
import {ColorUtils} from '../../../shared/utils/color.utils';
import {ColorScheme} from '../../../shared/theme/colors';

type Props = {
  color: ColorScheme;
};

export const ThemeView: FC<Props> = ({color}: Props) => {
  const classes = themeSelectStyles();
  const style = {background: ColorUtils.getGradientColor(color)};

  return <Box className={classes.root} style={style} />;
};