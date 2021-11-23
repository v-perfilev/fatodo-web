import React, {FC, HTMLAttributes, ReactNode} from 'react';
import {labeledBoxStyles} from './_styles';
import {Box, Typography} from '@material-ui/core';
import csx from 'classnames';

type Props = HTMLAttributes<HTMLElement> & {
  icon: ReactNode;
};

export const BoxWithIcon: FC<Props> = ({icon, children, className}: Props) => {
  const classes = labeledBoxStyles();
  const classNames = csx(classes.root, className);

  return (
    <Box className={classNames}>
      {icon}
      <Typography variant="body2" className={classes.text}>
        {children}
      </Typography>
    </Box>
  );
};
