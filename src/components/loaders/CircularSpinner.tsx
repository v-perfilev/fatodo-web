import React from 'react';
import {CircularProgress, CircularProgressProps} from '@mui/material';

type FCircularSpinnerProps = CircularProgressProps;

const CircularSpinner = (props: FCircularSpinnerProps) => {
  return <CircularProgress thickness={4} {...props} />;
};

export default CircularSpinner;
