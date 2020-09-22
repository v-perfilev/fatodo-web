import React, {FC, HTMLAttributes} from 'react';
import {paperBoxStyles} from './_styles';
import {Paper} from '@material-ui/core';

type Props = HTMLAttributes<any>;

export const PaperBox: FC<Props> = ({children}: Props) => {
  const classes = paperBoxStyles();

  return (
    <Paper square className={classes.root}>
      {children}
    </Paper>
  );
};
