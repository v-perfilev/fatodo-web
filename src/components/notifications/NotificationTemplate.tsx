import * as React from 'react';
import {memo, ReactElement} from 'react';
import CloseIcon from '../icons/CloseIcon';
import FHStack from '../boxes/FHStack';
import FVStack from '../boxes/FVStack';
import {useNotificationContext} from '../../shared/contexts/NotificationContext';
import {Box, IconButton, SxProps, Typography} from '@mui/material';
import FBox from '../boxes/FBox';

type NotificationTemplateProps = {
  image?: ReactElement;
  title: string;
  author?: string;
  content: ReactElement;
  onClick?: () => void;
};

const NotificationTemplate = ({image, title, author, content, onClick}: NotificationTemplateProps) => {
  const {close} = useNotificationContext();

  const handleClick = (): void => {
    if (onClick) {
      onClick();
      close();
    }
  };

  const handleClose = (e: React.MouseEvent): void => {
    e.stopPropagation();
    close();
  };

  return (
    <FVStack sx={containerStyles} spacing={1} onClick={handleClick}>
      <FBox justifyContent="space-between">
        <FHStack spacing={1} alignItems="center">
          {image}
          <Typography fontSize={14} fontWeight="bold" color="grey.600">
            {title}
          </Typography>
        </FHStack>
        <IconButton sx={closeButtonStyles} color="primary" size="small" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </FBox>
      <Typography component="div" fontSize={12}>
        {author && (
          <Box display="inline" color="primary.main" fontSize={12} fontWeight="bold">
            {author}: &nbsp;
          </Box>
        )}
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
        magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
        laborum.
        {content}
      </Typography>
    </FVStack>
  );
};

const containerStyles: SxProps = {
  paddingX: 2,
  paddingY: 1,
  borderWidth: 1,
  borderRadius: 3,
  borderStyle: 'solid',
  borderColor: 'primary.main',
  backgroundColor: 'grey.50',
  cursor: 'pointer',
};

const closeButtonStyles: SxProps = {
  marginRight: -1,
};

export default memo(NotificationTemplate);
