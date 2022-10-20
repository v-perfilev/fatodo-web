import React from 'react';
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
import {Button} from '@mui/material';
import PopupMenu, {PopupMenuItem} from '../../surfaces/PopupMenu';
import AuthSelectors from '../../../store/auth/authSelectors';
import {accountToUser} from '../../../models/User';
import UserView from '../../views/UserView';
import FHStack from '../../boxes/FHStack';

type HorizontalMenuProps = {
  redirectMap: RedirectMap;
};
const HorizontalMenu = ({redirectMap}: HorizontalMenuProps) => {
  const account = useAppSelector(AuthSelectors.account);
  const unreadCount = useAppSelector(ChatsSelectors.unreadCount);
  const incomingRequestCount = useAppSelector(ContactsSelectors.incomingRequestCount);
  const {t} = useTranslation();

  const user = accountToUser(account);

  return (
    <FHStack spacing={2}>
      <FHStack spacing={2} justifyContent="center">
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
      </FHStack>
      <FHStack spacing={2} justifyContent="flex-end">
        <LanguageSelect />
        <PopupMenu
          trigger={
            <Button color="primary">
              <UserView user={user} withUsername />
              <ArrowDownIcon />
            </Button>
          }
        >
          <PopupMenuItem
            action={redirectMap.toAccount}
            icon={<AccountIcon color="primary" />}
            text={t('routes.AccountForm')}
          />
          <PopupMenuItem
            action={redirectMap.logout}
            icon={<LogoutIcon color="primary" />}
            text={t('account:actions.logout')}
          />
        </PopupMenu>
      </FHStack>
    </FHStack>
  );
};

export default HorizontalMenu;
