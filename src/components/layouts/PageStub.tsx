import React, {memo} from 'react';
import {Box, BoxProps, SxProps, Typography} from '@mui/material';

type PageStubProps = BoxProps & {
  text: string;
  height?: number;
};

const PageStub = ({text, height, ...props}: PageStubProps) => {
  return (
    <Box height={height} sx={boxStyles} {...props}>
      <Box>
        <Typography fontWeight="bold" fontSize="lg" color="lightgray">
          {text}
        </Typography>
      </Box>
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
