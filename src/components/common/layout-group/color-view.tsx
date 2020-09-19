import * as React from 'react';
import {FC, HTMLAttributes} from 'react';
import csx from 'classnames';
import {colorViewStyles} from './_styles';
import {Box} from '@material-ui/core';
import {ColorUtils} from '../../../shared/utils/color.utils';
import {ColorScheme} from '../../../shared/theme/colors';

type Props = HTMLAttributes<any> & {
  color: ColorScheme;
};

const ColorView: FC<Props> = ({color, className}: Props) => {
  const classes = colorViewStyles();
  const classNames = csx(classes.root, className);

  const style = {background: ColorUtils.getGradientColor(color)};

  return <Box className={classNames} style={style} />;
};

export default ColorView;
