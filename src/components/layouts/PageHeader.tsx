import React, {ReactElement} from 'react';
import FHStack from '../boxes/FHStack';
import PageDivider from './PageDivider';
import {Box, Container, ContainerProps, IconButton, SxProps} from '@mui/material';
import {PAGE_HEADER_HEIGHT} from '../../constants';
import ArrowLeftIcon from '../icons/ArrowLeftIcon';
import TruncatedTypography from '../surfaces/TruncatedTypography';

type PageHeaderProps = ContainerProps & {
  title?: string;
  image?: ReactElement;
  position?: 'relative' | 'absolute';
  goBackAction?: () => void;
  width?: number;
};

const PageHeader = ({
  title,
  image,
  position = 'relative',
  goBackAction,
  width,
  children,
  ...props
}: PageHeaderProps) => {
  return (
    <Box sx={boxStyles(position, width)}>
      <Container sx={containerStyles} {...props}>
        <FHStack spacing={1} sx={contentStyles}>
          {title && (
            <FHStack spacing={1}>
              {goBackAction && (
                <IconButton sx={goBackButtonStyles} color="primary" onClick={goBackAction}>
                  <ArrowLeftIcon />
                </IconButton>
              )}
              {image}
              <TruncatedTypography fontSize={16} fontWeight="500" color="primary">
                {title}
              </TruncatedTypography>
            </FHStack>
          )}
          <FHStack spacing={1} flexGrow={title ? 0 : 1}>
            {children}
          </FHStack>
        </FHStack>
        <PageDivider height="2px" color="primary.light" />
      </Container>
    </Box>
  );
};

const boxStyles = (position: string, width?: number): SxProps => ({
  position,
  zIndex: 100,
  top: 0,
  left: 0,
  width: width || '100%',
});

const containerStyles: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  height: PAGE_HEADER_HEIGHT,
  flexShrink: 0,
};

const contentStyles: SxProps = {
  paddingLeft: 2,
  paddingRight: 1,
  backgroundColor: 'white',
};

const goBackButtonStyles: SxProps = {
  marginLeft: -2,
};

export default PageHeader;
