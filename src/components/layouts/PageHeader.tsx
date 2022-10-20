import React, {PropsWithChildren, ReactElement} from 'react';
import FHStack from '../boxes/FHStack';
import PageDivider from './PageDivider';
import {Box, Container, IconButton, SxProps, Typography} from '@mui/material';
import {PAGE_HEADER_HEIGHT} from '../../constants';
import ArrowLeftIcon from '../icons/ArrowLeftIcon';

type PageHeaderProps = PropsWithChildren<{
  title: string;
  image?: ReactElement;
  position?: 'relative' | 'absolute';
  goBackAction?: () => void;
}>;

const PageHeader = ({title, image, position = 'relative', goBackAction, children}: PageHeaderProps) => {
  return (
    <Box position={position} sx={rootStyles}>
      <Container sx={containerStyles}>
        <FHStack sx={contentStyles} spacing={2}>
          <FHStack flexGrow={0}>
            {goBackAction && (
              <IconButton color="primary" onClick={goBackAction}>
                <ArrowLeftIcon />
              </IconButton>
            )}
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
  zIndex: 100,
  width: '100%',
  height: PAGE_HEADER_HEIGHT,
};

const containerStyles: SxProps = {
  height: '100%',
  paddingBottom: '10px',
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
