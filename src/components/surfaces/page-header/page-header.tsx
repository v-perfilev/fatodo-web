import React, {FC, HTMLAttributes} from 'react';
import {Box} from '@material-ui/core';
import {pageHeaderStyles} from './_styles';

type Props = HTMLAttributes<HTMLElement>;

export const PageHeader: FC<Props> = ({children}: Props) => {
  const classes = pageHeaderStyles();

  return <Box className={classes.root}>{children}</Box>;
};
