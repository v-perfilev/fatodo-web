import * as React from 'react';
import {FC, HTMLAttributes} from 'react';
import csx from 'classnames';
import {colorViewStyles} from './_styles';
import {useTranslation} from 'react-i18next';
import {Box} from '@material-ui/core';
import {ColorUtils, GradientColor} from '../../../shared/utils/color.utils';

type Props = HTMLAttributes<any> & {
  color: GradientColor
};

const ColorView: FC<Props> = ({color, className}: Props) => {
  const classes = colorViewStyles();
  const colorClassName = ColorUtils.getGradientColorClass(color);
  const classNames = csx(classes.root, colorClassName, className);
  const {t} = useTranslation();

  return (
    <Box className={classNames} />
  );
};

export default ColorView;
