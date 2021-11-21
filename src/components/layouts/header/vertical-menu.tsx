import * as React from 'react';
import {FC} from 'react';
import {Box, List, ListItem, ListItemIcon, ListItemText} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import {sidebarMenuStyles} from './_styles';
import {AuthState} from '../../../store/rerducers/auth.reducer';
import {LogoutIcon} from '../../icons/logout-icon';
import {LoginIcon} from '../../icons/login-icon';
import {SignUpIcon} from '../../icons/signup-icon';
import {AccountIcon} from '../../icons/account-icon';
import CurrentUser from '../current-user';
import {UserListIcon} from '../../icons/user-list-icon';
import {useUnreadMessagesContext} from '../../../shared/contexts/chat-contexts/unread-messages-context';
import BadgeMessageIcon from '../../icons/badge-icons/badge-message-icon';
import {RedirectMap} from './type';
import withAuthState from '../../../shared/hocs/with-auth-state/with-auth-state';
import {GroupsIcon} from '../../icons/groups-icon';

type BaseProps = {
  redirectMap: RedirectMap;
};

type Props = AuthState & BaseProps;

const VerticalMenu: FC<Props> = ({isAuthenticated, redirectMap}: Props) => {
  const classes = sidebarMenuStyles();
  const {totalUnreadMessages} = useUnreadMessagesContext();
  const {t} = useTranslation();

  const unauthenticatedMenu = (
    <>
      <ListItem button onClick={redirectMap.toLogin}>
        <ListItemIcon>
          <LoginIcon color="primary" />
        </ListItemIcon>
        <ListItemText>{t('header.login')}</ListItemText>
      </ListItem>
      <ListItem color="primary" button onClick={redirectMap.toRegistration}>
        <ListItemIcon>
          <SignUpIcon color="primary" />
        </ListItemIcon>
        <ListItemText>{t('header.register')}</ListItemText>
      </ListItem>
    </>
  );

  const authenticatedMenu = (
    <>
      <ListItem button onClick={redirectMap.toGroups}>
        <ListItemIcon>
          <GroupsIcon color="primary" />
        </ListItemIcon>
        <ListItemText>{t('header.groups')}</ListItemText>
      </ListItem>
      <ListItem button onClick={redirectMap.toChats}>
        <ListItemIcon>
          <BadgeMessageIcon count={totalUnreadMessages} color="primary" />
        </ListItemIcon>
        <ListItemText>{t('header.chats')}</ListItemText>
      </ListItem>
      <ListItem button onClick={redirectMap.toContacts}>
        <ListItemIcon>
          <UserListIcon color="primary" />
        </ListItemIcon>
        <ListItemText>{t('header.contacts')}</ListItemText>
      </ListItem>
      <ListItem button onClick={redirectMap.toAccount}>
        <ListItemIcon>
          <AccountIcon color="primary" />
        </ListItemIcon>
        <ListItemText>{t('header.account')}</ListItemText>
      </ListItem>
      <ListItem button onClick={redirectMap.toRootAndLogout}>
        <ListItemIcon>
          <LogoutIcon color="primary" />
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

export default withAuthState(VerticalMenu);
