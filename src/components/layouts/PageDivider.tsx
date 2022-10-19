import React from 'react';
import {Divider, DividerProps} from '@mui/material';

type PageDividerProps = DividerProps;

const PageDivider = (props: PageDividerProps) => {
  return <Divider {...props} />;
};

export default PageDivider;
