import React, {FC} from 'react';
import {Box, List, ListItem, ListItemIcon, ListItemText, Theme} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import {AuthState} from '../../../store/rerducers/auth.reducer';
import {useUnreadMessagesContext} from '../../../shared/contexts/chat-contexts/unread-messages-context';
import BadgeMessageIcon from '../../icons/badgeIcons/BadgeMessageIcon';
import {RedirectMap} from './type';
import withAuthState from '../../../shared/hocs/with-auth-state/with-auth-state';
import {useContactInfoContext} from '../../../shared/contexts/contact-contexts/contact-info-context';
import BadgeContactInfo from '../../icons/badgeIcons/BadgeContactIcon';
import LoginIcon from '../../icons/LoginIcon';
import {makeStyles} from '@material-ui/core/styles';
import SignUpIcon from '../../icons/SignUpIcon';
import GroupsIcon from '../../icons/GroupsIcon';
import AccountIcon from '../../icons/AccountIcon';
import LogoutIcon from '../../icons/LogoutIcon';
import ControlUser from '../ControlUser';

type Props = AuthState & {
  redirectMap: RedirectMap;
};

const VerticalMenu: FC<Props> = ({isAuthenticated, redirectMap}: Props) => {
  const classes = verticalMenuStyles();
  const {totalUnreadMessages} = useUnreadMessagesContext();
  const {incomingRequestCount} = useContactInfoContext();
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
          <BadgeContactInfo count={incomingRequestCount} color="primary" />
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
          <ControlUser />
        </Box>
      )}
      <List component="nav">{isAuthenticated ? authenticatedMenu : unauthenticatedMenu}</List>
    </>
  );
};

const verticalMenuStyles = makeStyles((theme: Theme) => ({
  username: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
}));

export default withAuthState(VerticalMenu);
