import * as React from 'react';
import {FC, ReactNode} from 'react';
import {Box, Dialog, DialogContent, DialogTitle, IconButton, Typography} from '@material-ui/core';
import {SlideDown} from '../../../utils/animation.helpers';
import {modalStyles} from '../_styles';
import {CloseIcon} from '../icons/close-icon';

const useStyles = modalStyles;

interface Props {
  isOpen: boolean;
  toggle: () => void;
  headerText: string;
  headerIcon?: ReactNode;
  content: ReactNode;
}

const Modal: FC<Props> = ({isOpen, toggle, headerText, headerIcon, content}) => {
  const classes = useStyles();

  return (
    <Dialog open={isOpen} onClose={toggle} TransitionComponent={SlideDown}>
      <DialogTitle disableTypography={true} className={classes.header}>
        {headerIcon && <Box className={classes.icon}>{headerIcon}</Box>}
        <Typography variant="h6">{headerText}</Typography>
        <IconButton onClick={toggle} className={classes.closeButton}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers={true}>{content}</DialogContent>
    </Dialog>
  );
};

export default Modal;
