import React from 'react';
import {Box, Container, ContainerProps, SxProps} from '@mui/material';
import {HEADER_HEIGHT} from '../../constants';

type PageContainerProps = ContainerProps & {
  withoutContainer?: boolean;
};

const PageContainer = ({withoutContainer, children, ...props}: PageContainerProps) => {
  return withoutContainer ? (
    <Box sx={rootStyles}>
      <Box sx={boxStyles}>{children}</Box>
    </Box>
  ) : (
    <Box sx={rootStyles}>
      <Container sx={containerStyles} {...props}>
        <Box sx={boxStyles}>{children}</Box>
      </Container>
    </Box>
  );
};

const rootStyles: SxProps = {
  width: '100%',
  height: `calc(100vh - ${HEADER_HEIGHT}px)`,
};

const containerStyles: SxProps = {
  height: '100%',
};

const boxStyles: SxProps = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
};

export default PageContainer;
