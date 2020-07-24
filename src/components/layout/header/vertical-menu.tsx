import {RootState} from '../../../store';
import * as React from 'react';
import {FC} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import {logout} from '../../../store/actions/auth.actions';
import {Trans, withTranslation} from 'react-i18next';
import {sidebarMenuStyles} from './_styles';
import {AuthState} from '../../../store/rerducers/auth.reducer';
import {LogoutIcon} from '../../../shared/components/icons/logout-icon';
import {compose} from 'recompose';
import {Routes} from '../../router';
import {LoginIcon} from '../../../shared/components/icons/login-icon';
import {SignUpIcon} from '../../../shared/components/icons/signup-icon';
import {RouteComponentProps, withRouter} from 'react-router-dom';

const mapStateToProps = (state: RootState): {authState: AuthState} => ({authState: state.authState});
const mapDispatchToProps = {logout};
const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector> & RouteComponentProps;

const VerticalMenu: FC<Props> = ({authState: {isAuthenticated}, logout, history}: Props) => {
  const classes = sidebarMenuStyles();

  const redirectToLogin = (): void => history.push(Routes.LOGIN);
  const redirectToRegistration = (): void => history.push(Routes.REGISTRATION);

  return (
    <List component="nav">
      {isAuthenticated && (
        <ListItem button onClick={logout}>
          <ListItemIcon>
            <LogoutIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText>
            <Trans i18nKey={'header.logout'} />
          </ListItemText>
        </ListItem>
      )}
      {!isAuthenticated && (
        <ListItem button onClick={redirectToLogin}>
          <ListItemIcon>
            <LoginIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText>
            <Trans i18nKey={'header.login'} />
          </ListItemText>
        </ListItem>
      )}
      {!isAuthenticated && (
        <ListItem color="primary" button onClick={redirectToRegistration}>
          <ListItemIcon>
            <SignUpIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText>
            <Trans i18nKey={'header.register'} />
          </ListItemText>
        </ListItem>
      )}
    </List>
  );
};

export default compose(connector, withTranslation(), withRouter)(VerticalMenu);