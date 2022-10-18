import React from 'react';
import {Stack, StackProps} from '@mui/material';

type FHStackProps = StackProps;

const FHStack = ({children, ...props}: FHStackProps) => {
  return (
    <Stack flexGrow={1} spacing={1} direction="row" alignItems="center" {...props}>
      {children}
    </Stack>
  );
};

export default FHStack;
