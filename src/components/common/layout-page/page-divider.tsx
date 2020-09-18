import React, {FC, HTMLAttributes} from 'react';
import {Box} from '@material-ui/core';
import csx from 'classnames';
import {ColorSchemeUtils, ColorScheme} from '../../../shared/utils/color-scheme.utils';
import {pageDividerStyles} from './_styles';

type Props = HTMLAttributes<any> & {
  color: ColorScheme;
  height?: number;
};

const PageDivider: FC<Props> = ({color, height, className}: Props) => {
  const classes = pageDividerStyles();
  const colorClassName = ColorSchemeUtils.getBackgroundClass(color);
  const classNames = csx(classes.root, colorClassName, className);

  const style = {height: !!height ? height : 1};

  return <Box className={classNames} style={style} />;
};

export default PageDivider;
