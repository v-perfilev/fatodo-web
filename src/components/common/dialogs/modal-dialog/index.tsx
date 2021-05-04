import React, {FC, ReactElement} from 'react';
import {Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton} from '@material-ui/core';
import {CloseIcon} from '../../icons/close-icon';
import {modalDialogStyles} from './_styles';

type Props = {
  isOpen: boolean;
  close?: () => void;
  title?: ReactElement | string;
  content?: ReactElement | string;
  actions?: ReactElement;
  withText?: boolean;
  showCloseIcon?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
};

const ModalDialog: FC<Props> = ({isOpen, close, title, content, actions, withText, showCloseIcon, size}: Props) => {
  const classes = modalDialogStyles();

  const maxWidth = size || 'sm';

  return (
    <Dialog open={isOpen} onClose={close} fullWidth maxWidth={maxWidth}>
      {title && (
        <DialogTitle className={classes.title}>
          {title}
          {showCloseIcon && (
            <Box className={classes.closeIcon}>
              <IconButton size="small" onClick={close}>
                <CloseIcon />
              </IconButton>
            </Box>
          )}
        </DialogTitle>
      )}
      {content && (
        <DialogContent>
          {withText && <DialogContentText className={classes.content}>{content}</DialogContentText>}
          {!withText && <Box className={classes.content}>{content}</Box>}
        </DialogContent>
      )}
      {actions && <DialogActions className={classes.actions}>{actions}</DialogActions>}
    </Dialog>
  );
};
export default ModalDialog;
