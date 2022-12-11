import React from 'react';
import {BoxProps} from '@mui/material';
import FBox from '../boxes/FBox';

type PageDividerProps = BoxProps & {
  height?: string;
  color?: string;
};

const PageDivider = ({height = '1px', color = 'grey.300', ...props}: PageDividerProps) => {
  return <FBox sx={{minWidth: '100%', maxHeight: height, height: height, backgroundColor: color}} {...props} />;
};

export default PageDivider;
