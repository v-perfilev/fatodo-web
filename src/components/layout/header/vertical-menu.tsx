import {RootState} from '../../../store';
import * as React from 'react';
import {FC} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import {logout} from '../../../store/actions/auth.actions';
import {useTranslation} from 'react-i18next';
import {sidebarMenuStyles} from './_styles';
import {AuthState} from '../../../store/rerducers/auth.reducer';
import {LogoutIcon} from '../../common/icons/logout-icon';
import {compose} from 'recompose';
import {Routes} from '../../router';
import {LoginIcon} from '../../common/icons/login-icon';
import {SignUpIcon} from '../../common/icons/signup-icon';
import {RouteComponentProps, withRouter} from 'react-router-dom';

const mapStateToProps = (state: RootState): {authState: AuthState} => ({authState: state.authState});
const mapDispatchToProps = {logout};
const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector> & RouteComponentProps;

const VerticalMenu: FC<Props> = ({authState: {isAuthenticated}, logout, history}: Props) => {
  const classes = sidebarMenuStyles();
  const {t} = useTranslation();

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
            {t('header.logout')}
          </ListItemText>
        </ListItem>
      )}
      {!isAuthenticated && (
        <ListItem button onClick={redirectToLogin}>
          <ListItemIcon>
            <LoginIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText>
            {t('header.login')}
          </ListItemText>
        </ListItem>
      )}
      {!isAuthenticated && (
        <ListItem color="primary" button onClick={redirectToRegistration}>
          <ListItemIcon>
            <SignUpIcon className={classes.icon} />
          </ListItemIcon>
          <ListItemText>
            {t('header.register')}
          </ListItemText>
        </ListItem>
      )}
    </List>
  );
};

export default compose(connector, withRouter)(VerticalMenu);
