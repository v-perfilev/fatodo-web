import {RootState} from '../../../../store';
import * as React from 'react';
import {FC} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {Box, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import {logout} from '../../../../store/actions/auth.actions';
import {useTranslation} from 'react-i18next';
import {sidebarMenuStyles} from './_styles';
import {AuthState} from '../../../../store/rerducers/auth.reducer';
import {LogoutIcon} from '../../icons/logout-icon';
import {compose} from 'recompose';
import {Routes} from '../../../router';
import {LoginIcon} from '../../icons/login-icon';
import {SignUpIcon} from '../../icons/signup-icon';
import {useHistory, withRouter} from 'react-router-dom';
import {AccountIcon} from '../../icons/account-icon';
import Username from '../username';

const mapStateToProps = (state: RootState): {authState: AuthState} => ({authState: state.authState});
const mapDispatchToProps = {logout};
const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

const VerticalMenu: FC<Props> = ({authState: {isAuthenticated}, logout}: Props) => {
  const classes = sidebarMenuStyles();
  const {t} = useTranslation();
  const history = useHistory();

  const redirectToLogin = (): void => history.push(Routes.LOGIN);
  const redirectToRegistration = (): void => history.push(Routes.REGISTRATION);
  const redirectToAccount = (): void => history.push(Routes.ACCOUNT);
  const redirectAndLogout = (): void => {
    history.push(Routes.ROOT);
    logout();
  };

  const unauthenticatedMenu = (
    <>
      <ListItem button onClick={redirectToLogin}>
        <ListItemIcon>
          <LoginIcon className={classes.icon} />
        </ListItemIcon>
        <ListItemText>{t('header.login')}</ListItemText>
      </ListItem>
      <ListItem color="primary" button onClick={redirectToRegistration}>
        <ListItemIcon>
          <SignUpIcon className={classes.icon} />
        </ListItemIcon>
        <ListItemText>{t('header.register')}</ListItemText>
      </ListItem>
    </>
  );

  const authenticatedMenu = (
    <>
      <ListItem button onClick={redirectToAccount}>
        <ListItemIcon>
          <AccountIcon className={classes.icon} />
        </ListItemIcon>
        <ListItemText>{t('header.account')}</ListItemText>
      </ListItem>
      <ListItem button onClick={redirectAndLogout}>
        <ListItemIcon>
          <LogoutIcon className={classes.icon} />
        </ListItemIcon>
        <ListItemText>{t('header.logout')}</ListItemText>
      </ListItem>
    </>
  );

  return (
    <>
      {isAuthenticated && (
        <Box className={classes.username}>
          <Username />
        </Box>
      )}
      <List component="nav">
        {!isAuthenticated && unauthenticatedMenu}
        {isAuthenticated && authenticatedMenu}
      </List>
    </>
  );
};

export default compose(connector, withRouter)(VerticalMenu);
