import {RootState} from '../../store';
import * as React from 'react';
import {FC, useState} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import Button from '@material-ui/core/Button';
import {Box} from '@material-ui/core';
import {logout} from '../../store/actions/auth.actions';
import {Trans, useTranslation} from 'react-i18next';
import LoginForm from '../account/login-form';
import RegisterForm from '../account/register-form';
import {accountStyles} from './_styles';
import Modal from '../common/modals/modal';
import {AuthState} from '../../store/rerducers/auth.reduser';
import {LoginIcon} from '../common/icons/login-icon';
import {LogoutIcon} from '../common/icons/logout-icon';
import {SignUpIcon} from '../common/icons/signup-icon';
import {compose} from 'recompose';

const useStyles = accountStyles;

const mapStateToProps = (state: RootState): {authState: AuthState} => ({authState: state.authState});
const mapDispatchToProps = {logout};
const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

const Account: FC<Props> = ({authState, logout}: Props) => {
  const isAuthenticated = authState.isAuthenticated;
  const classes = useStyles();
  const {t} = useTranslation();
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const [registerModalOpen, setRegisterModalOpen] = useState<boolean>(false);

  const toggleLoginModal = (): void => setLoginModalOpen((currentValue) => !currentValue);
  const toggleRegisterModal = (): void => setRegisterModalOpen((currentValue) => !currentValue);

  return (
    <Box className={classes.root}>
      {isAuthenticated && (
        <Button color="primary" startIcon={<LogoutIcon />} onClick={logout}>
          <Trans i18nKey={'header.logout'} />
        </Button>
      )}
      {!isAuthenticated && (
        <Button color="primary" startIcon={<LoginIcon />} onClick={toggleLoginModal}>
          <Trans i18nKey={'header.login'} />
        </Button>
      )}
      {!isAuthenticated && (
        <Button variant="contained" color="primary" startIcon={<SignUpIcon />} onClick={toggleRegisterModal}>
          <Trans i18nKey={'header.register'} />
        </Button>
      )}

      <Modal
        isOpen={loginModalOpen}
        toggle={toggleLoginModal}
        headerText={t('form:login.header')}
        headerIcon={<LoginIcon />}
        content={<LoginForm onSuccess={toggleLoginModal} />}
      />

      <Modal
        isOpen={registerModalOpen}
        toggle={toggleRegisterModal}
        headerText={t('form:register.header')}
        headerIcon={<SignUpIcon />}
        content={<RegisterForm onSuccess={toggleRegisterModal} />}
      />
    </Box>
  );
};

export default compose(connector)(Account);
