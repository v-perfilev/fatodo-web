import {RootState} from '../../store';
import * as React from 'react';
import {FC, useState} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import Button from '@material-ui/core/Button';
import {Box} from '@material-ui/core';
import {login, logout} from '../../store/actions/auth.actions';
import {useTranslation} from 'react-i18next';
import LoginForm from '../auth/login-form';
import RegisterForm from '../auth/register-form';
import {accountStyles} from './_styles';
import Modal from '../common/modals/modal';
import {AuthState} from '../../store/rerducers/auth.reduser';
import {LoginIcon} from '../common/icons/login-icon';
import {LogoutIcon} from '../common/icons/logout-icon';
import {SignUpIcon} from '../common/icons/signup-icon';

const useStyles = accountStyles;

const mapStateToProps = (state: RootState): {authState: AuthState} => ({authState: state.authState});
const mapDispatchToProps = {logout, login};
const connector = connect(mapStateToProps, mapDispatchToProps);

type ComposedProps = ConnectedProps<typeof connector>;

const Account: FC<null> = ({authState, login, logout}: ComposedProps) => {
  const classes = useStyles();
  const {t} = useTranslation();
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const [registerModalOpen, setRegisterModalOpen] = useState<boolean>(false);

  const isAuthenticated = authState.isAuthenticated;

  const emptyFunc = (): void => {
    return;
  };
  const testLogin = (): Promise<any> =>
    login({user: 'testuser', password: 'test_password'}, true, emptyFunc, emptyFunc);

  const toggleLoginModal = (): void => setLoginModalOpen((currentValue) => !currentValue);
  const toggleRegisterModal = (): void => setRegisterModalOpen((currentValue) => !currentValue);

  return (
    <Box className={classes.root}>
      <Button variant="contained" color="primary" onClick={testLogin}>
        Test login
      </Button>

      {isAuthenticated && (
        <Button color="inherit" onClick={logout}>
          <LogoutIcon className={classes.icon} />
          {t('header.logout')}
        </Button>
      )}
      {!isAuthenticated && (
        <Button color="inherit" onClick={toggleLoginModal}>
          <LoginIcon className={classes.icon} />
          {t('header.login')}
        </Button>
      )}
      {!isAuthenticated && (
        <Button variant="contained" color="secondary" onClick={toggleRegisterModal}>
          <SignUpIcon className={classes.icon} />
          {t('header.register')}
        </Button>
      )}

      <Modal
        isOpen={loginModalOpen}
        toggle={toggleLoginModal}
        headerText={t('login.header')}
        headerIcon={<LoginIcon />}
        content={<LoginForm onSuccess={toggleLoginModal} />}
      />

      <Modal
        isOpen={registerModalOpen}
        toggle={toggleRegisterModal}
        headerText={t('register.header')}
        headerIcon={<SignUpIcon />}
        content={<RegisterForm onSuccess={toggleRegisterModal} />}
      />
    </Box>
  );
};

export default connector(Account);
