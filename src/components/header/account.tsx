import {RootState} from '../../store';
import * as React from 'react';
import {FC, useState} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import Button from '@material-ui/core/Button';
import {Box, createStyles, StyleRules, Theme, withStyles, WithStyles} from '@material-ui/core';
import {login, logout} from '../../store/actions/auth.actions';
import {compose} from 'redux';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import {useTranslation} from 'react-i18next';
import {AuthenticationState} from '../../store/rerducers/auth.reduser';
import LoginModal from '../auth/login-modal';
import RegisterModal from '../auth/register-modal';

const mapStateToProps = ({authState}: RootState): {authState: AuthenticationState} => ({authState});
const mapDispatchToProps = {logout, login};
const connector = connect(mapStateToProps, mapDispatchToProps);

const styles = (theme: Theme): StyleRules<any> =>
  createStyles({
    root: {
      '& > *': {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        '&:first-child': {
          marginLeft: theme.spacing(0),
        },
        '&:last-child': {
          marginRight: theme.spacing(0),
        },
      },
    },
    icon: {
      marginRight: theme.spacing(1),
    },
  });

type Props = ConnectedProps<typeof connector> & WithStyles<typeof styles>;

const Account: FC<any> = ({authState, login, logout, classes}: Props) => {
  const [loginModalOpen, setLoginModalOpen] = useState<boolean>(false);
  const [registerModalOpen, setRegisterModalOpen] = useState<boolean>(false);
  const {t} = useTranslation();
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
          <PowerSettingsNewIcon className={classes.icon} />
          {t('header.logout')}
        </Button>
      )}
      {!isAuthenticated && (
        <Button color="inherit" onClick={toggleLoginModal}>
          <ExitToAppIcon className={classes.icon} />
          {t('header.login')}
        </Button>
      )}
      {!isAuthenticated && (
        <Button variant="contained" color="secondary" onClick={toggleRegisterModal}>
          <AccessibilityNewIcon className={classes.icon} />
          {t('header.register')}
        </Button>
      )}

      <LoginModal isOpen={loginModalOpen} toggle={toggleLoginModal} />
      <RegisterModal isOpen={registerModalOpen} toggle={toggleRegisterModal} />
    </Box>
  );
};

export default compose(connector, withStyles(styles))(Account);
