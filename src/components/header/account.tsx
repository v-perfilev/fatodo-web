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
import {AccessibilityNew, ExitToApp, PowerSettingsNew} from '@material-ui/icons';
import SmallModal from '../common/small-modal';
import {AuthState} from '../../store/rerducers/auth.reduser';

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

  const emptyFunc = (): void => console.log('');
  const doIt = (): Promise<any> => login({user: 'testuser', password: 'test_password'}, true, emptyFunc, emptyFunc);

  const toggleLoginModal = (): void => setLoginModalOpen((currentValue) => !currentValue);
  const toggleRegisterModal = (): void => setRegisterModalOpen((currentValue) => !currentValue);

  return (
    <Box className={classes.root}>
      <Button variant="contained" color="primary" onClick={doIt}>
        Test login
      </Button>

      {isAuthenticated && (
        <Button color="inherit" onClick={logout}>
          <PowerSettingsNew className={classes.icon} />
          {t('header.logout')}
        </Button>
      )}
      {!isAuthenticated && (
        <Button color="inherit" onClick={toggleLoginModal}>
          <ExitToApp className={classes.icon} />
          {t('header.login')}
        </Button>
      )}
      {!isAuthenticated && (
        <Button variant="contained" color="secondary" onClick={toggleRegisterModal}>
          <AccessibilityNew className={classes.icon} />
          {t('header.register')}
        </Button>
      )}

      <SmallModal
        isOpen={loginModalOpen}
        toggle={toggleLoginModal}
        headerText={t('login.header')}
        headerIcon={<ExitToApp />}
        content={<LoginForm onSuccess={toggleLoginModal} />}
      />

      <SmallModal
        isOpen={registerModalOpen}
        toggle={toggleRegisterModal}
        headerText={t('register.header')}
        headerIcon={<AccessibilityNew />}
        content={<RegisterForm onSuccess={toggleRegisterModal} />}
      />
    </Box>
  );
};

export default connector(Account);
