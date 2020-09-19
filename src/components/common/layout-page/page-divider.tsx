import React, {FC, HTMLAttributes} from 'react';
import {Box} from '@material-ui/core';
import csx from 'classnames';
import {pageDividerStyles} from './_styles';

type Props = HTMLAttributes<any> & {
  height?: number;
};

const PageDivider: FC<Props> = ({height, className}: Props) => {
  const classes = pageDividerStyles();
  const classNames = csx(classes.root, className);

  const style = {height: !!height ? height : 1};

  return <Box className={classNames} style={style} />;
};

export default PageDivider;
