import React, {FC, HTMLAttributes, ReactNode} from 'react';
import {labeledBoxStyles} from './_styles';
import {Box, Typography} from '@material-ui/core';
import csx from 'classnames';

type Props = HTMLAttributes<any> & {
  label: string;
  children: ReactNode;
};

const LabeledBox: FC<Props> = ({label, children, className}: Props) => {
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

export default LabeledBox;
