import React from 'react';
import {Box} from '@mui/material';

type PageDividerProps = {
  height?: string;
  color?: string;
};

const PageDivider = ({height = '1px', color = 'grey.300'}: PageDividerProps) => {
  return <Box sx={{width: '100%', height, backgroundColor: color}} />;
};

export default PageDivider;
