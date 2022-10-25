import React from 'react';
import {Container, ContainerProps} from '@mui/material';
import FBox from '../boxes/FBox';

type PageContentProps = ContainerProps;

const PageContent = ({children, ...props}: PageContentProps) => {
  return (
    <Container {...props}>
      <FBox flexGrow={1}>{children}</FBox>
    </Container>
  );
};

export default PageContent;
