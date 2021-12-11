import React, {FC, HTMLAttributes} from 'react';
import {paperBoxStyles} from './_styles';
import {Paper} from '@material-ui/core';

type Props = HTMLAttributes<HTMLElement>;

export const PaperBox: FC<Props> = ({children}: Props) => {
  const classes = paperBoxStyles();

  return <Paper className={classes.root}>{children}</Paper>;
};
