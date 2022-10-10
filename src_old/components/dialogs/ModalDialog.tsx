import React, {ReactElement} from 'react';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Theme,
} from '@material-ui/core';
import CloseIcon from '../icons/CloseIcon';
import {makeStyles} from '@material-ui/core/styles';

type ModalDialogProps = {
  isOpen: boolean;
  close?: () => void;
  title?: ReactElement | string;
  content?: ReactElement | string;
  actions?: ReactElement;
  withText?: boolean;
  showCloseIcon?: boolean;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
};

const ModalDialog = ({isOpen, close, title, content, actions, withText, showCloseIcon, size}: ModalDialogProps) => {
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

const modalDialogStyles = makeStyles((theme: Theme) => ({
  title: {
    position: 'relative',
    display: 'flex',
    paddingRight: theme.spacing(7),
    color: theme.palette.primary.contrastText,
    background: theme.palette.gradient,
  },
  closeIcon: {
    height: '100%',
    position: 'absolute',
    top: 0,
    right: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    '& *': {
      color: theme.palette.primary.contrastText,
    },
  },
  content: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  actions: {
    marginTop: theme.spacing(-2),
  },
}));

export default ModalDialog;
