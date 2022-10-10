import React, {HTMLAttributes} from 'react';
import {Box, CircularProgress} from '@material-ui/core';
import csx from 'classnames';
import {LoaderSizeType} from './types';
import {makeStyles} from '@material-ui/core/styles';

type CircularSpinnerProps = HTMLAttributes<HTMLElement> & {
  size?: LoaderSizeType;
};

const CircularSpinner = ({size, className}: CircularSpinnerProps) => {
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

const circularSpinnerStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default CircularSpinner;
