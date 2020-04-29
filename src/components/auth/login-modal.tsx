import { connect, ConnectedProps } from 'react-redux';
import * as React from 'react';
import { IRootState } from '../../store';
import {
  Button,
  createStyles,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import { slideDown } from '../../utils/animation.helpers';
import { theme } from '../../shared/theme';
import { compose } from 'redux';
import CloseIcon from '@material-ui/icons/Close';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import LoginForm from './login-form';
import { login, toggleLoginModal } from '../../store/actions/auth.actions';
import { useTranslation } from 'react-i18next';

const styles = () =>
  createStyles({
    header: {
      display: 'flex',
      alignItems: 'center',
      minWidth: 200,
      margin: 0,
      padding: theme.spacing(2),
      color: 'white',
      background: theme.palette.primary.main,
    },
    icon: {
      marginRight: theme.spacing(1),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: 'white',
    },
  });

type Props = ConnectedProps<typeof connector> & WithStyles<typeof styles>;

const LoginModal = ({ authState, toggleLoginModal, login, classes }: Props) => {
  const { t } = useTranslation();
  const isModalOpen = authState.showLoginModal;

  const doIt = () => login({ user: 'test_user', password: 'test_password' }, true);

  return (
    <Dialog open={isModalOpen} onClose={toggleLoginModal} TransitionComponent={slideDown}>
      <DialogTitle disableTypography={true} className={classes.header}>
        <AccountBoxIcon className={classes.icon} />
        <Typography variant="h6">{t('auth.header')}</Typography>
        <IconButton onClick={toggleLoginModal} className={classes.closeButton}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers={true}>
        <LoginForm />
        <Button variant="contained" color="primary" onClick={doIt}>
          Test
        </Button>
      </DialogContent>
    </Dialog>
  );
};

const mapStateToProps = ({ authState }: IRootState) => ({ authState });
const mapDispatchToProps = { toggleLoginModal, login };
const connector = connect(mapStateToProps, mapDispatchToProps);

export default compose(connector, withStyles(styles))(LoginModal);
