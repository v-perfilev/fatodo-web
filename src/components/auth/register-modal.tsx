import * as React from 'react';
import {FC} from 'react';
import {
  createStyles,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  StyleRules,
  Typography,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import {SlideDown} from '../../utils/animation.helpers';
import {COLORS, theme} from '../../shared/theme';
import CloseIcon from '@material-ui/icons/Close';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import RegisterForm from './register-form';
import {useTranslation} from 'react-i18next';

interface RegisterModalProps {
  isOpen: boolean;
  toggle: () => void;
}

const styles = (): StyleRules<any> =>
  createStyles({
    header: {
      display: 'flex',
      alignItems: 'center',
      margin: 0,
      padding: theme.spacing(2),
      color: COLORS.WHITE,
      background: theme.palette.primary.main,
    },
    icon: {
      marginRight: theme.spacing(1),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: COLORS.WHITE,
    },
  });

type Props = RegisterModalProps & WithStyles<typeof styles>;

const RegisterModal: FC<RegisterModalProps> = ({isOpen, toggle, classes}: Props) => {
  const {t} = useTranslation();

  return (
    <Dialog open={isOpen} onClose={toggle} TransitionComponent={SlideDown}>
      <DialogTitle disableTypography={true} className={classes.header}>
        <AccountBoxIcon className={classes.icon} />
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

export default withStyles(styles)(RegisterModal);
