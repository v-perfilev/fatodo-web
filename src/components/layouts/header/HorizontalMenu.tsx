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
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ChatsSelectors from '../../../store/chats/chatsSelectors';
import ContactsSelectors from '../../../store/contacts/contactsSelectors';
import {Button} from '@mui/material';
import PopupMenu, {PopupMenuItem} from '../../surfaces/PopupMenu';
import AuthSelectors from '../../../store/auth/authSelectors';
import {accountToUser} from '../../../models/User';
import UserView from '../../views/UserView';
import FHStack from '../../boxes/FHStack';
import SettingsIcon from '../../icons/SettingsIcon';
import PasswordIcon from '../../icons/PasswordIcon';
import CalendarIcon from '../../icons/CalendarIcon';
import {ChangeLanguageDTO} from '../../../models/dto/ChangeLanguageDTO';
import {AuthActions} from '../../../store/auth/authActions';

type HorizontalMenuProps = {
  redirectMap: RedirectMap;
};
const HorizontalMenu = ({redirectMap}: HorizontalMenuProps) => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(AuthSelectors.account);
  const unreadCount = useAppSelector(ChatsSelectors.unreadCount);
  const incomingRequestCount = useAppSelector(ContactsSelectors.incomingRequestCount);
  const {t} = useTranslation();

  const user = accountToUser(account);

  const changeLanguage = (code: string): void => {
    const dto: ChangeLanguageDTO = {language: code.toUpperCase()};
    dispatch(AuthActions.changeLanguageThunk(dto));
  };

  return (
    <FHStack>
      <FHStack justifyContent="center">
        <Button color="primary" startIcon={<GroupsIcon />} onClick={redirectMap.toGroups}>
          {t('routes.Groups')}
        </Button>
        <Button color="primary" startIcon={<CalendarIcon />} onClick={redirectMap.toCalendar}>
          {t('routes.Calendar')}
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
      <FHStack justifyContent="flex-end">
        <LanguageSelect onChange={changeLanguage} />
        <PopupMenu
          trigger={
            <Button color="primary">
              <UserView user={user} withUsername />
              <ArrowDownIcon />
            </Button>
          }
        >
          <PopupMenuItem
            action={redirectMap.toAccountMain}
            icon={<AccountIcon />}
            color="primary"
            text={t('routes.AccountForm')}
          />
          <PopupMenuItem
            action={redirectMap.toAccountSettings}
            icon={<SettingsIcon />}
            color="primary"
            text={t('routes.AccountSettingsForm')}
          />
          <PopupMenuItem
            action={redirectMap.toAccountChangePassword}
            icon={<PasswordIcon />}
            color="primary"
            text={t('routes.AccountChangePasswordForm')}
          />
          <PopupMenuItem
            action={redirectMap.logout}
            icon={<LogoutIcon />}
            color="primary"
            text={t('account:actions.logout')}
          />
        </PopupMenu>
      </FHStack>
    </FHStack>
  );
};

export default HorizontalMenu;
