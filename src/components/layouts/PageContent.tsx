import React, {HTMLAttributes} from 'react';
import {Container} from '@mui/material';
import FBox from '../boxes/FBox';

type PageContentProps = HTMLAttributes<HTMLElement>;

const PageContent = ({children}: PageContentProps) => {
  return (
    <Container>
      <FBox flexGrow={1}>{children}</FBox>
    </Container>
  );
};

export default PageContent;
