import {RootState} from '../../store';
import * as React from 'react';
import {FC} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import {List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import {logout} from '../../store/actions/auth.actions';
import {Trans, withTranslation} from 'react-i18next';
import {sidebarMenuStyles} from './_styles';
import {AuthState} from '../../store/rerducers/auth.reduser';
import {LogoutIcon} from '../common/icons/logout-icon';
import {compose} from 'recompose';
import Link from '../common/link';
import {Routes} from '../router';
import {LoginIcon} from '../common/icons/login-icon';
import {SignUpIcon} from '../common/icons/signup-icon';

const mapStateToProps = (state: RootState): {authState: AuthState} => ({authState: state.authState});
const mapDispatchToProps = {logout};
const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

const VerticalMenu: FC<Props> = ({authState: {isAuthenticated}, logout}: Props) => {
  const classes = sidebarMenuStyles();

  return (
    <List component="nav">
      {isAuthenticated && (
        <ListItem button onClick={logout}>
          <ListItemIcon className={classes.icon}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText>
            <Trans i18nKey={'header.logout'} />
          </ListItemText>
        </ListItem>
      )}
      {!isAuthenticated && (
        <Link to={Routes.LOGIN} underline="none">
          <ListItem button>
            <ListItemIcon className={classes.icon}>
              <LoginIcon />
            </ListItemIcon>
            <ListItemText>
              <Trans i18nKey={'header.login'} />
            </ListItemText>
          </ListItem>
        </Link>
      )}
      {!isAuthenticated && (
        <Link to={Routes.REGISTRATION} underline="none">
          <ListItem color="primary" button>
            <ListItemIcon className={classes.icon}>
              <SignUpIcon />
            </ListItemIcon>
            <ListItemText>
              <Trans i18nKey={'header.register'} />
            </ListItemText>
          </ListItem>
        </Link>
      )}
    </List>
  );
};

export default compose(connector, withTranslation())(VerticalMenu);
