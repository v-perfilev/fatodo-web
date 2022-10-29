import React, {PropsWithChildren, ReactElement} from 'react';
import FHStack from '../boxes/FHStack';
import PageDivider from './PageDivider';
import {Box, IconButton, SxProps, Typography} from '@mui/material';
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
    <Box sx={containerStyles} position={position}>
      <FHStack sx={contentStyles}>
        <FHStack spacing={1}>
          {goBackAction && (
            <IconButton sx={{marginLeft: -2}} color="primary" onClick={goBackAction}>
              <ArrowLeftIcon />
            </IconButton>
          )}
          {image}
          <Typography fontSize="16pt" fontWeight="500" color="primary">
            {title}
          </Typography>
        </FHStack>
        <FHStack spacing={1} flexGrow={0}>
          {children}
        </FHStack>
      </FHStack>
      <PageDivider height="2px" color="primary.light" />
    </Box>
  );
};

const containerStyles: SxProps = {
  zIndex: 100,
  width: '100%',
  height: PAGE_HEADER_HEIGHT,
  paddingBottom: '10px',
};

const contentStyles: SxProps = {
  width: '100%',
  height: '100%',
  paddingLeft: 2,
  paddingRight: 1,
  backgroundColor: 'white',
};

export default PageHeader;
