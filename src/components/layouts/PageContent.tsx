import React from 'react';
import {Box, Container, ContainerProps} from '@mui/material';

type PageContentProps = ContainerProps;

const PageContent = ({children, ...props}: PageContentProps) => {
  return (
    <Container {...props}>
      <Box>{children}</Box>
    </Container>
  );
};

export default PageContent;
