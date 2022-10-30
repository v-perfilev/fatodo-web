import React from 'react';
import FHStack from '../boxes/FHStack';
import PageDivider from './PageDivider';
import {Container, ContainerProps, SxProps} from '@mui/material';
import {PAGE_FOOTER_HEIGHT} from '../../constants';

type PageHeaderProps = ContainerProps & {
  position?: 'relative' | 'absolute';
};

const PageFooter = ({position = 'relative', children, ...props}: PageHeaderProps) => {
  return (
    <Container sx={containerStyles(position)} {...props}>
      <PageDivider height="2px" color="primary.light" />
      <FHStack sx={contentStyles}>{children}</FHStack>
    </Container>
  );
};

const containerStyles = (position: string): SxProps => ({
  position,
  zIndex: 100,
  bottom: 0,
  left: 0,
  right: 0,
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: PAGE_FOOTER_HEIGHT,
});

const contentStyles: SxProps = {
  paddingX: 1,
  backgroundColor: 'white',
};

export default PageFooter;
