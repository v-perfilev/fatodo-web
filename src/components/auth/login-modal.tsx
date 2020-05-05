import * as React from 'react';
import {FC} from 'react';
import {Dialog, DialogContent, DialogTitle, IconButton, Typography} from '@material-ui/core';
import {SlideDown} from '../../utils/animation.helpers';
import LoginForm from './login-form';
import {useTranslation} from 'react-i18next';
import {authModalStyles} from './_styles';
import {Close, ExitToApp} from '@material-ui/icons';

const useStyles = authModalStyles;

interface Props {
  isOpen: boolean;
  toggle: () => void;
}

const LoginModal: FC<Props> = ({isOpen, toggle}: Props) => {
  const classes = useStyles();
  const {t} = useTranslation();

  return (
    <Dialog open={isOpen} onClose={toggle} TransitionComponent={SlideDown}>
      <DialogTitle disableTypography={true} className={classes.header}>
        <ExitToApp className={classes.icon} />
        <Typography variant="h6">{t('login.header')}</Typography>
        <IconButton onClick={toggle} className={classes.closeButton}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers={true}>
        <LoginForm toggle={toggle} />
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
