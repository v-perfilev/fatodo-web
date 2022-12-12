import React from 'react';
import FHStack from '../boxes/FHStack';
import PageDivider from './PageDivider';
import {Box, Container, ContainerProps, SxProps} from '@mui/material';
import {PAGE_FOOTER_HEIGHT} from '../../constants';

type PageHeaderProps = ContainerProps & {
  position?: 'relative' | 'absolute';
  width?: number;
};

const PageFooter = ({position = 'relative', width, children, ...props}: PageHeaderProps) => {
  return (
    <Box sx={boxStyles(position, width)}>
      <Container sx={containerStyles} {...props}>
        <PageDivider height="2px" color="primary.light" />
        <FHStack sx={contentStyles}>{children}</FHStack>
      </Container>
    </Box>
  );
};

const boxStyles = (position: string, width?: number): SxProps => ({
  position,
  zIndex: 100,
  bottom: 0,
  left: 0,
  width: width || '100%',
});

const containerStyles: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  height: PAGE_FOOTER_HEIGHT,
  overflow: 'hidden',
};

const contentStyles: SxProps = {
  paddingX: 1,
  backgroundColor: 'white',
};

export default PageFooter;
