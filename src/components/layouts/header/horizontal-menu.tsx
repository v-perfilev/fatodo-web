import * as React from 'react';
import {FC, useRef, useState} from 'react';
import Button from '@material-ui/core/Button';
import {Box, MenuItem} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import {horizontalMenuStyles} from './_styles';
import {AuthState} from '../../../store/rerducers/auth.reducer';
import {LoginIcon} from '../../icons/login-icon';
import {LogoutIcon} from '../../icons/logout-icon';
import {SignUpIcon} from '../../icons/signup-icon';
import {LanguageSelect} from '../../controls';
import CurrentUser from '../current-user';
import {ArrowDownIcon} from '../../icons/arrow-down-icon';
import {PopupMenu} from '../../surfaces';
import {AccountIcon} from '../../icons/account-icon';
import {useUnreadMessagesContext} from '../../../shared/contexts/chat-contexts/unread-messages-context';
import BadgeMessageIcon from '../../icons/badge-icons/badge-message-icon';
import {RedirectMap} from './type';
import withAuthState from '../../../shared/hocs/with-auth-state/with-auth-state';
import {GroupsIcon} from '../../icons/groups-icon';
import {useContactInfoContext} from '../../../shared/contexts/contact-contexts/contact-info-context';
import BadgeContactInfo from '../../icons/badge-icons/badge-contact-icon';

type BaseProps = {
  redirectMap: RedirectMap;
};

type Props = AuthState & BaseProps;

const HorizontalMenu: FC<Props> = ({redirectMap, isAuthenticated}: Props) => {
  const classes = horizontalMenuStyles();
  const {totalUnreadMessages} = useUnreadMessagesContext();
  const {incomingRequestCount} = useContactInfoContext();
  const {t} = useTranslation();
  const ref = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (): void => setIsOpen(true);
  const handleClose = (): void => setIsOpen(false);

  const unauthenticatedMenu = (
    <>
      <LanguageSelect />
      <Button color="primary" startIcon={<LoginIcon />} onClick={redirectMap.toLogin}>
        {t('header.login')}
      </Button>
      <Button variant="contained" color="secondary" startIcon={<SignUpIcon />} onClick={redirectMap.toRegistration}>
        {t('header.register')}
      </Button>
    </>
  );

  const authenticatedMenu = (
    <>
      <Button color="primary" startIcon={<GroupsIcon />} onClick={redirectMap.toGroups}>
        {t('header.groups')}
      </Button>
      <Button
        color="primary"
        startIcon={<BadgeMessageIcon count={totalUnreadMessages} />}
        onClick={redirectMap.toChats}
      >
        {t('header.chats')}
      </Button>
      <Button
        color="primary"
        startIcon={<BadgeContactInfo count={incomingRequestCount} />}
        onClick={redirectMap.toContacts}
      >
        {t('header.contacts')}
      </Button>
      <LanguageSelect />
      <Button color="primary" onClick={handleClick} ref={ref}>
        <CurrentUser />
        <ArrowDownIcon />
      </Button>
      <PopupMenu anchorEl={ref.current} open={isOpen} onClose={handleClose}>
        <MenuItem onClick={redirectMap.toAccount}>
          <AccountIcon marginPosition="right" color="primary" />
          {t('header.account')}
        </MenuItem>
        <MenuItem onClick={redirectMap.toRootAndLogout}>
          <LogoutIcon marginPosition="right" color="primary" />
          {t('header.logout')}
        </MenuItem>
      </PopupMenu>
    </>
  );

  return <Box className={classes.root}>{isAuthenticated ? authenticatedMenu : unauthenticatedMenu}</Box>;
};

export default withAuthState(HorizontalMenu);
