import React from 'react';
import {Paper, PaperProps} from '@mui/material';

type PaperBoxProps = PaperProps;

const PaperBox = ({children, ...props}: PaperBoxProps) => {
  return <Paper {...props}>{children}</Paper>;
};

export default PaperBox;
