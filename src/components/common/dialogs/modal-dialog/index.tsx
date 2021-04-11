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
  showCloseIcon?: boolean;
};

const ModalDialog: FC<Props> = ({isOpen, close, title, content, actions, showCloseIcon}: Props) => {
    const classes = modalDialogStyles();

    return (
      <Dialog open={isOpen} onClose={close}>
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
          <DialogContent className={classes.content}>
            <DialogContentText>
              {content}
            </DialogContentText>
          </DialogContent>
        )}
        {actions && (
          <DialogActions>
            {actions}
          </DialogActions>
        )}
      </Dialog>
    );
  }
;

export default ModalDialog;
