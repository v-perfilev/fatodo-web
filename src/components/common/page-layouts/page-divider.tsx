import React, {FC, HTMLAttributes} from 'react';
import {Box} from '@material-ui/core';
import csx from 'classnames';
import {GradientColor} from '../../_types';
import {pageDividerStyles} from './_styles';
import {ClassNameMap} from '@material-ui/core/styles/withStyles';

type Props = HTMLAttributes<any> & {
  color: GradientColor;
  height?: number;
};

const getGradientColorClass = (classes: ClassNameMap, color: GradientColor): string => {
  switch (color) {
    case 'yellow':
      return classes.yellow;
    default:
      return classes.yellow;
  }
};

const PageDivider: FC<Props> = ({color, height, className}: Props) => {
  const classes = pageDividerStyles();
  const colorClassName = getGradientColorClass(classes, color);
  const classNames = csx(classes.root, colorClassName, className);

  const style = {height: !!height ? height : 1};

  return (
    <Box className={classNames} style={style} />
  );
};

export default PageDivider;
