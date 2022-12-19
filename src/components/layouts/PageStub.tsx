import React, {memo} from 'react';
import {Box, BoxProps, SxProps} from '@mui/material';

type PageStubProps = BoxProps & {
  text?: string; // TODO remove
  height?: number;
};

const PageStub = ({height, children, ...props}: PageStubProps) => {
  return (
    <Box height={height} sx={boxStyles} {...props}>
      <Box>{children}</Box>
    </Box>
  );
};

const boxStyles: SxProps = {
  display: 'flex',
  flexGrow: 1,
  justifyContent: 'center',
  alignItems: 'center',
};

export default memo(PageStub);
