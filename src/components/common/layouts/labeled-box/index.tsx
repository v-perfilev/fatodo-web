import React, {FC, HTMLAttributes} from 'react';
import {labeledBoxStyles} from './_styles';
import {Box, Typography} from '@material-ui/core';

type Props = HTMLAttributes<any> & {
  label: string;
};

export const LabeledBox: FC<Props> = ({label, children}: Props) => {
  const classes = labeledBoxStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="body2" className={classes.label}>
        {label}:
      </Typography>
      {children}
    </Box>
  );
};
