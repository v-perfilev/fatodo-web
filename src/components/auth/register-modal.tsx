import * as React from 'react';
import {FC} from 'react';
import {Dialog, DialogContent, DialogTitle, IconButton, Typography} from '@material-ui/core';
import {SlideDown} from '../../utils/animation.helpers';
import CloseIcon from '@material-ui/icons/Close';
import RegisterForm from './register-form';
import {useTranslation} from 'react-i18next';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import {authModalStyles} from './_styles';

const useStyles = authModalStyles;

interface Props {
  isOpen: boolean;
  toggle: () => void;
}

const RegisterModal: FC<Props> = ({isOpen, toggle}: Props) => {
  const classes = useStyles();
  const {t} = useTranslation();

  return (
    <Dialog open={isOpen} onClose={toggle} TransitionComponent={SlideDown}>
      <DialogTitle disableTypography={true} className={classes.header}>
        <AccessibilityNewIcon className={classes.icon} />
        <Typography variant="h6">{t('register.header')}</Typography>
        <IconButton onClick={toggle} className={classes.closeButton}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers={true}>
        <RegisterForm toggle={toggle} />
      </DialogContent>
    </Dialog>
  );
};

export default RegisterModal;
