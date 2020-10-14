import * as React from 'react';
import {FC, HTMLAttributes} from 'react';
import {circularSpinnerStyles} from './_styles';
import {Box, CircularProgress} from '@material-ui/core';
import csx from 'classnames';

type Props = HTMLAttributes<any>;

export const CircularSpinner: FC<Props> = ({className}: Props) => {
  const classes = circularSpinnerStyles();
  const classNames = csx(classes.root, className);

  return (
    <Box className={classNames}>
      <CircularProgress size={70} thickness={4} />
    </Box>
  );
};
