import React, {FC, HTMLAttributes} from 'react';
import {Box} from '@material-ui/core';
import csx from 'classnames';
import {ColorUtils, GradientColor} from '../../../shared/utils/color.utils';
import {pageDividerStyles} from './_styles';

type Props = HTMLAttributes<any> & {
  color: GradientColor;
  height?: number;
};

const PageDivider: FC<Props> = ({color, height, className}: Props) => {
  const classes = pageDividerStyles();
  const classNames = csx(classes.root, ColorUtils.getClassNameForGradientColor(classes, color), className);

  const style = {height: !!height ? height : 1};

  return (
    <Box className={classNames} style={style} />
  );
};

export default PageDivider;
