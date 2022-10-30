import React from 'react';
import {Container, ContainerProps} from '@mui/material';
import FVStack from '../boxes/FVStack';

type PageContentProps = ContainerProps;

const PageContent = ({children, ...props}: PageContentProps) => {
  return (
    <Container {...props}>
      <FVStack spacing={0}>{children}</FVStack>
    </Container>
  );
};

export default PageContent;
