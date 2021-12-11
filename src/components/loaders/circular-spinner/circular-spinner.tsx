import * as React from 'react';
import {FC, HTMLAttributes} from 'react';
import {circularSpinnerStyles} from './_styles';
import {Box, CircularProgress} from '@material-ui/core';
import csx from 'classnames';
import {SizeType} from '../types';

type Props = HTMLAttributes<HTMLElement> & {
  size?: SizeType;
};

export const CircularSpinner: FC<Props> = ({size, className}: Props) => {
  const classes = circularSpinnerStyles();

  let pxSize;
  switch (size) {
    case 'xs':
      pxSize = 20;
      break;
    case 'sm':
      pxSize = 50;
      break;
    case 'md':
      pxSize = 70;
      break;
    case 'lg':
      pxSize = 80;
      break;
    default:
      pxSize = 70;
  }

  const classNames = csx(classes.root, className);

  return (
    <Box className={classNames}>
      <CircularProgress size={pxSize} thickness={4} />
    </Box>
  );
};
