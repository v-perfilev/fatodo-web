import React, {ReactElement} from 'react';
import FHStack from '../boxes/FHStack';
import PageDivider from './PageDivider';
import {Container, ContainerProps, IconButton, SxProps} from '@mui/material';
import {PAGE_HEADER_HEIGHT} from '../../constants';
import ArrowLeftIcon from '../icons/ArrowLeftIcon';
import TruncatedTypography from '../surfaces/TruncatedTypography';

type PageHeaderProps = ContainerProps & {
  title?: string;
  image?: ReactElement;
  position?: 'relative' | 'absolute';
  goBackAction?: () => void;
};

const PageHeader = ({title, image, position = 'relative', goBackAction, children, ...props}: PageHeaderProps) => {
  return (
    <Container sx={containerStyles(position)} {...props}>
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
      <PageDivider ml={-2} mr={-2} height="2px" color="primary.light" />
    </Container>
  );
};

const containerStyles = (position: string): SxProps => ({
  position,
  zIndex: 100,
  top: 0,
  left: 0,
  right: 0,
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: PAGE_HEADER_HEIGHT,
  flexShrink: 0,
});

const contentStyles: SxProps = {
  marginLeft: -2,
  marginRight: -2,
  paddingLeft: 3,
  paddingRight: 3,
  backgroundColor: 'white',
};

const goBackButtonStyles: SxProps = {
  marginLeft: -2,
};

export default PageHeader;
