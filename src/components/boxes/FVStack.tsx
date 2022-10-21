import React from 'react';
import {Stack, StackProps} from '@mui/material';

type FVStackProps = StackProps;

const FVStack = ({children, ...props}: FVStackProps) => {
  return (
    <Stack flexGrow={1} spacing={2} alignItems="stretch" {...props}>
      {children}
    </Stack>
  );
};

export default FVStack;
