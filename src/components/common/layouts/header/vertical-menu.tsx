import * as React from 'react';
import {FC} from 'react';
import {Box, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import {sidebarMenuStyles} from './_styles';
import {AuthState} from '../../../../store/rerducers/auth.reducer';
import {LogoutIcon} from '../../icons/logout-icon';
import {compose} from 'recompose';
import {LoginIcon} from '../../icons/login-icon';
import {SignUpIcon} from '../../icons/signup-icon';
import {AccountIcon} from '../../icons/account-icon';
import CurrentUser from '../current-user';
import {UserListIcon} from '../../icons/user-list-icon';
import {useUnreadMessagesContext} from '../../../../shared/contexts/messenger-contexts/unread-messages-context';
import BadgeMessageIcon from '../../icons/badge-icons/badge-message-icon';
import {RedirectMap} from './type';
import withAuthState from '../../../../shared/hocs/with-auth-state';

type Props = AuthState & {
  redirectMap: RedirectMap;
};

const VerticalMenu: FC<Props> = ({isAuthenticated, redirectMap}: Props) => {
  const classes = sidebarMenuStyles();
  const {totalUnreadMessages} = useUnreadMessagesContext();
  const {t} = useTranslation();

  const unauthenticatedMenu = (
    <>
      <ListItem button onClick={redirectMap.toLogin}>
        <ListItemIcon>
          <LoginIcon className={classes.icon} />
        </ListItemIcon>
        <ListItemText>{t('header.login')}</ListItemText>
      </ListItem>
      <ListItem color="primary" button onClick={redirectMap.toRegistration}>
        <ListItemIcon>
          <SignUpIcon className={classes.icon} />
        </ListItemIcon>
        <ListItemText>{t('header.register')}</ListItemText>
      </ListItem>
    </>
  );

  const authenticatedMenu = (
    <>
      <ListItem button onClick={redirectMap.toMessages}>
        <ListItemIcon>
          <BadgeMessageIcon count={totalUnreadMessages} className={classes.icon} />
        </ListItemIcon>
        <ListItemText>{t('header.messages')}</ListItemText>
      </ListItem>
      <ListItem button onClick={redirectMap.toContacts}>
        <ListItemIcon>
          <UserListIcon className={classes.icon} />
        </ListItemIcon>
        <ListItemText>{t('header.contacts')}</ListItemText>
      </ListItem>
      <ListItem button onClick={redirectMap.toAccount}>
        <ListItemIcon>
          <AccountIcon className={classes.icon} />
        </ListItemIcon>
        <ListItemText>{t('header.account')}</ListItemText>
      </ListItem>
      <ListItem button onClick={redirectMap.toRootAndLogout}>
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
          <CurrentUser />
        </Box>
      )}
      <List component="nav">{isAuthenticated ? authenticatedMenu : unauthenticatedMenu}</List>
    </>
  );
};

export default compose(withAuthState)(VerticalMenu);
