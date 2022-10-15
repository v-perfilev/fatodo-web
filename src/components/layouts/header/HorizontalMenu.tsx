import React, {useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import BadgeMessageIcon from '../../icons/badgeIcons/BadgeMessageIcon';
import {RedirectMap} from './type';
import BadgeContactInfo from '../../icons/badgeIcons/BadgeContactIcon';
import LanguageSelect from '../../controls/LanguageSelect';
import GroupsIcon from '../../icons/GroupsIcon';
import ArrowDownIcon from '../../icons/ArrowDownIcon';
import AccountIcon from '../../icons/AccountIcon';
import LogoutIcon from '../../icons/LogoutIcon';
import {useAppSelector} from '../../../store/store';
import ChatsSelectors from '../../../store/chats/chatsSelectors';
import ContactsSelectors from '../../../store/contacts/contactsSelectors';
import {Button, MenuItem, Stack, SxProps} from '@mui/material';
import PopupMenu from '../../surfaces/popupMenu/PopupMenu';
import AuthSelectors from '../../../store/auth/authSelectors';
import {accountToUser} from '../../../models/User';
import UserView from '../../views/UserView';

type HorizontalMenuProps = {
  redirectMap: RedirectMap;
};
const HorizontalMenu = ({redirectMap}: HorizontalMenuProps) => {
  const account = useAppSelector(AuthSelectors.account);
  const unreadCount = useAppSelector(ChatsSelectors.unreadCount);
  const incomingRequestCount = useAppSelector(ContactsSelectors.incomingRequestCount);
  const {t} = useTranslation();
  const ref = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const user = accountToUser(account);

  const handleClick = (): void => setIsOpen(true);
  const handleClose = (): void => setIsOpen(false);

  return (
    <Stack spacing={2} direction="row" alignItems="center">
      <Button color="primary" startIcon={<GroupsIcon />} onClick={redirectMap.toGroups}>
        {t('routes.Groups')}
      </Button>
      <Button color="primary" startIcon={<BadgeMessageIcon count={unreadCount} />} onClick={redirectMap.toChats}>
        {t('routes.Chats')}
      </Button>
      <Button
        color="primary"
        startIcon={<BadgeContactInfo count={incomingRequestCount} />}
        onClick={redirectMap.toContacts}
      >
        {t('routes.Contacts')}
      </Button>
      <LanguageSelect />
      <Button color="primary" onClick={handleClick} ref={ref}>
        <UserView user={user} withUsername />
        <ArrowDownIcon />
      </Button>
      <PopupMenu anchorEl={ref?.current} open={isOpen} onClose={handleClose}>
        <MenuItem onClick={redirectMap.toAccount}>
          <AccountIcon sx={menuIconStyles} color="primary" />
          {t('routes.AccountForm')}
        </MenuItem>
        <MenuItem onClick={redirectMap.logout}>
          <LogoutIcon sx={menuIconStyles} color="primary" />
          {t('account:actions.logout')}
        </MenuItem>
      </PopupMenu>
    </Stack>
  );
};

const menuIconStyles: SxProps = {
  marginRight: 1,
};

export default HorizontalMenu;
