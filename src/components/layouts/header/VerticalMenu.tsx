import React from 'react';
import {useTranslation} from 'react-i18next';
import BadgeMessageIcon from '../../icons/badgeIcons/BadgeMessageIcon';
import {RedirectMap} from './type';
import BadgeContactInfo from '../../icons/badgeIcons/BadgeContactIcon';
import GroupsIcon from '../../icons/GroupsIcon';
import AccountIcon from '../../icons/AccountIcon';
import LogoutIcon from '../../icons/LogoutIcon';
import {useAppSelector} from '../../../store/store';
import ChatsSelectors from '../../../store/chats/chatsSelectors';
import ContactsSelectors from '../../../store/contacts/contactsSelectors';
import {Box, List, ListItemButton, ListItemIcon, ListItemText, Stack} from '@mui/material';
import AuthSelectors from '../../../store/auth/authSelectors';
import {accountToUser} from '../../../models/User';
import UserView from '../../views/UserView';
import {styled} from '@mui/styles';
import PageDivider from '../PageDivider';
import SettingsIcon from '../../icons/SettingsIcon';
import PasswordIcon from '../../icons/PasswordIcon';
import CalendarIcon from '../../icons/CalendarIcon';

type VerticalMenuProps = {
  redirectMap: RedirectMap;
};

const VerticalMenu = ({redirectMap}: VerticalMenuProps) => {
  const account = useAppSelector(AuthSelectors.account);
  const unreadCount = useAppSelector(ChatsSelectors.unreadCount);
  const incomingRequestCount = useAppSelector(ContactsSelectors.incomingRequestCount);
  const {t} = useTranslation();

  const user = accountToUser(account);

  return (
    <Stack flexGrow={1}>
      <Box p={2}>
        <UserView user={user} withUsername />
      </Box>
      <List component="nav">
        <ListItemButton onClick={redirectMap.toGroups}>
          <StyledListItemIcon>
            <GroupsIcon color="primary" />
          </StyledListItemIcon>
          <StyledListItemText>{t('routes.Groups')}</StyledListItemText>
        </ListItemButton>

        <ListItemButton onClick={redirectMap.toCalendar}>
          <StyledListItemIcon>
            <CalendarIcon color="primary" />
          </StyledListItemIcon>
          <StyledListItemText>{t('routes.Calendar')}</StyledListItemText>
        </ListItemButton>

        <ListItemButton onClick={redirectMap.toChats}>
          <StyledListItemIcon>
            <BadgeMessageIcon count={unreadCount} color="primary" />
          </StyledListItemIcon>
          <StyledListItemText>{t('routes.Chats')}</StyledListItemText>
        </ListItemButton>

        <ListItemButton onClick={redirectMap.toContacts}>
          <StyledListItemIcon>
            <BadgeContactInfo count={incomingRequestCount} color="primary" />
          </StyledListItemIcon>
          <StyledListItemText>{t('routes.Contacts')}</StyledListItemText>
        </ListItemButton>

        <PageDivider />

        <ListItemButton onClick={redirectMap.toAccountMain}>
          <StyledListItemIcon>
            <AccountIcon color="primary" />
          </StyledListItemIcon>
          <StyledListItemText>{t('routes.AccountForm')}</StyledListItemText>
        </ListItemButton>

        <ListItemButton onClick={redirectMap.toAccountSettings}>
          <StyledListItemIcon>
            <SettingsIcon color="primary" />
          </StyledListItemIcon>
          <StyledListItemText>{t('routes.AccountSettingsForm')}</StyledListItemText>
        </ListItemButton>

        <ListItemButton onClick={redirectMap.toAccountChangePassword}>
          <StyledListItemIcon>
            <PasswordIcon color="primary" />
          </StyledListItemIcon>
          <StyledListItemText>{t('routes.AccountChangePasswordForm')}</StyledListItemText>
        </ListItemButton>

        <PageDivider />

        <ListItemButton onClick={redirectMap.logout}>
          <StyledListItemIcon>
            <LogoutIcon color="primary" />
          </StyledListItemIcon>
          <StyledListItemText>{t('account:actions.logout')}</StyledListItemText>
        </ListItemButton>
      </List>
    </Stack>
  );
};

const StyledListItemIcon = styled(ListItemIcon)({
  minWidth: 0,
  marginRight: 16,
});

const StyledListItemText = styled(ListItemText)({
  '& *': {
    fontSize: 14,
  },
});

export default VerticalMenu;
