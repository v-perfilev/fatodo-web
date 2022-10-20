import React, {PropsWithChildren, ReactElement} from 'react';
import FHStack from '../boxes/FHStack';
import PageDivider from './PageDivider';
import {Box, Container, SxProps, Typography} from '@mui/material';
import {PAGE_HEADER_HEIGHT} from '../../constants';

type PageHeaderProps = PropsWithChildren<{
  title: string;
  image?: ReactElement;
}>;

const PageHeader = ({title, image, children}: PageHeaderProps) => {
  return (
    <Box sx={rootStyles}>
      <Container sx={containerStyles}>
        <FHStack sx={contentStyles} spacing={2}>
          <FHStack flexGrow={0}>
            {image}
            <Typography fontSize="16pt" fontWeight="500" color="primary">
              {title}
            </Typography>
          </FHStack>
          {children}
        </FHStack>
        <PageDivider height="2px" color="primary.light" />
      </Container>
    </Box>
  );
};

const rootStyles: SxProps = {
  position: 'absolute',
  zIndex: 100,
  width: '100%',
  height: PAGE_HEADER_HEIGHT,
};

const containerStyles: SxProps = {
  height: '100%',
};

const contentStyles: SxProps = {
  width: '100%',
  height: '100%',
  paddingLeft: 2,
  paddingRight: 1,
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: 'white',
};

export default PageHeader;
