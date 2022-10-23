import React, {HTMLAttributes} from 'react';
import {Box, Container, SxProps} from '@mui/material';
import {HEADER_HEIGHT} from '../../constants';

type PageContainerProps = HTMLAttributes<HTMLElement> & {
  withoutContainer?: boolean;
};

const PageContainer = ({withoutContainer, children}: PageContainerProps) => {
  return withoutContainer ? (
    <Box sx={rootStyles}>
      <Box sx={boxStyles}>{children}</Box>
    </Box>
  ) : (
    <Box sx={rootStyles}>
      <Container sx={containerStyles}>
        <Box sx={boxStyles}>{children}</Box>
      </Container>
    </Box>
  );
};

const rootStyles: SxProps = {
  position: 'relative',
  width: '100%',
  height: `calc(100vh - ${HEADER_HEIGHT}px)`,
};

const containerStyles: SxProps = {
  height: '100%',
};

const boxStyles: SxProps = {
  width: '100%',
  height: '100%',
};

export default PageContainer;
