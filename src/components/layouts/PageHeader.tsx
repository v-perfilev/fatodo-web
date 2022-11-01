import React, {ReactElement} from 'react';
import FHStack from '../boxes/FHStack';
import PageDivider from './PageDivider';
import {Container, ContainerProps, IconButton, SxProps, Typography} from '@mui/material';
import {PAGE_HEADER_HEIGHT} from '../../constants';
import ArrowLeftIcon from '../icons/ArrowLeftIcon';

type PageHeaderProps = ContainerProps & {
  title?: string;
  image?: ReactElement;
  position?: 'relative' | 'absolute';
  goBackAction?: () => void;
};

const PageHeader = ({title, image, position = 'relative', goBackAction, children, ...props}: PageHeaderProps) => {
  return (
    <Container sx={containerStyles(position)} {...props}>
      <FHStack sx={contentStyles}>
        {title && (
          <FHStack spacing={1}>
            {goBackAction && (
              <IconButton sx={goBackButtonStyles} color="primary" onClick={goBackAction}>
                <ArrowLeftIcon />
              </IconButton>
            )}
            {image}
            <Typography fontSize={16} fontWeight="500" color="primary">
              {title}
            </Typography>
          </FHStack>
        )}
        <FHStack spacing={1} flexGrow={title ? 0 : 1}>
          {children}
        </FHStack>
      </FHStack>
      <PageDivider height="2px" color="primary.light" />
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
  paddingLeft: 1,
  backgroundColor: 'white',
};

const goBackButtonStyles: SxProps = {
  marginLeft: -1,
};

export default PageHeader;
