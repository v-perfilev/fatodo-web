import React, {HTMLAttributes} from 'react';
import {Box, SxProps} from '@mui/material';
import {HEADER_HEIGHT} from '../../constants';

type PageHeader = HTMLAttributes<HTMLElement>;

const PageContainer = ({children}: PageHeader) => {
  return <Box sx={containerStyle}>{children}</Box>;
};

const containerStyle: SxProps = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: `calc(100vh - ${HEADER_HEIGHT})`,
  overflow: 'hidden',
};

export default PageContainer;
