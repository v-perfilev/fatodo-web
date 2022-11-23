import React from 'react';
import {Box, BoxProps} from '@mui/material';

type PageDividerProps = BoxProps & {
  height?: string;
  color?: string;
};

const PageDivider = ({height = '1px', color = 'grey.300', ...props}: PageDividerProps) => {
  return <Box sx={{width: '100%', height, backgroundColor: color}} {...props} />;
};

export default PageDivider;
