import React, {FC, HTMLAttributes} from 'react';
import {labeledBoxStyles} from './_styles';
import {Box, Typography} from '@material-ui/core';
import csx from 'classnames';

type Props = HTMLAttributes<HTMLElement> & {
  label: string;
};

export const LabeledBox: FC<Props> = ({label, children, className}: Props) => {
  const classes = labeledBoxStyles();
  const classNames = csx(classes.root, className);

  return (
    <Box className={classNames}>
      <Typography variant="body2" className={classes.label}>
        {label}:
      </Typography>
      {children}
    </Box>
  );
};
