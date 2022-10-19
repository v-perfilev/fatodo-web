import React from 'react';
import FVStack from '../boxes/FVStack';
import FHStack from '../boxes/FHStack';
import PageDivider from './PageDivider';
import {Box, BoxProps, Container, SxProps} from '@mui/material';

type PageHeader = BoxProps;

const PageHeader = ({children, ...props}: PageHeader) => {
  return (
    <Box {...props}>
      <Container>
        <FVStack sx={containerStyle} spacing={0.5}>
          <FHStack sx={contentStyle} spacing={2}>
            {children}
          </FHStack>
          <PageDivider />
        </FVStack>
      </Container>
    </Box>
  );
};

const containerStyle: SxProps = {
  width: '100%',
  backgroundColor: 'white',
};

const contentStyle: SxProps = {
  width: '100%',
  marginTop: 1,
  paddingLeft: 2,
  paddingRight: 1,
  justifyContent: 'space-between',
};

export default PageHeader;
