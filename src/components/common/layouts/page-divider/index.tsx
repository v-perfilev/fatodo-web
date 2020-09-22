import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {pageDividerStyles} from './_styles';

type Props = {
  height?: number;
};

export const PageDivider: FC<Props> = ({height}: Props) => {
  const classes = pageDividerStyles();

  const style = {height: !!height ? height : 1};

  return <Box className={classes.root} style={style} />;
};
