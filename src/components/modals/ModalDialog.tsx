import React, {memo, ReactElement} from 'react';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  SxProps,
  Typography,
} from '@mui/material';
import {Breakpoint} from '@mui/system';
import CloseIcon from '../icons/CloseIcon';
import PageDivider from '../layouts/PageDivider';
import FHStack from '../boxes/FHStack';

type ModalDialogProps = {
  open: boolean;
  close: () => void;
  title: string;
  content: ReactElement | string;
  actions?: ReactElement;
  size?: Breakpoint;
  color?: string;
  withText?: boolean;
};

const ModalDialog = ({open, close, title, content, actions, size, color = 'primary', withText}: ModalDialogProps) => {
  return (
    <Dialog open={open} onClose={close} fullWidth maxWidth={size}>
      <DialogTitle sx={titleStyles}>
        <FHStack justifyContent="space-between">
          <Typography color={color} fontSize="18" fontWeight="bold">
            {title}
          </Typography>
          <IconButton size="small" onClick={close}>
            <CloseIcon />
          </IconButton>
        </FHStack>
      </DialogTitle>
      <PageDivider height="2px" color={`${color}.light`} />
      <DialogContent>
        {withText && <DialogContentText>{content}</DialogContentText>}
        {!withText && <Box>{content}</Box>}
      </DialogContent>
      {actions && <DialogActions>{actions}</DialogActions>}
    </Dialog>
  );
};

const titleStyles: SxProps = {
  paddingRight: 2,
};

export default memo(ModalDialog);
