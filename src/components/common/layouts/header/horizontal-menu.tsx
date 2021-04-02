import * as React from 'react';
import {FC, useRef, useState} from 'react';
import Button from '@material-ui/core/Button';
import {Box, MenuItem} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import {horizontalMenuStyles} from './_styles';
import {AuthState} from '../../../../store/rerducers/auth.reducer';
import {LoginIcon} from '../../icons/login-icon';
import {LogoutIcon} from '../../icons/logout-icon';
import {SignUpIcon} from '../../icons/signup-icon';
import {LanguageSelect} from '../../controls';
import CurrentUser from '../current-user';
import {ArrowDownIcon} from '../../icons/arrow-down-icon';
import {PopupMenu} from '../../surfaces';
import {AccountIcon} from '../../icons/account-icon';
import {UserListIcon} from '../../icons/user-list-icon';
import {useUnreadMessagesContext} from '../../../../shared/contexts/messenger-contexts/unread-messages-context';
import BadgeMessageIcon from '../../icons/badge-icons/badge-message-icon';
import {compose} from 'recompose';
import {RedirectMap} from './type';
import withAuthState from '../../../../shared/hocs/with-auth-state';

type Props = AuthState & {
  redirectMap: RedirectMap;
};

const HorizontalMenu: FC<Props> = ({redirectMap, isAuthenticated}: Props) => {
  const classes = horizontalMenuStyles();
  const {totalUnreadMessages} = useUnreadMessagesContext();
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
      <Button
        color="primary"
        startIcon={<BadgeMessageIcon count={totalUnreadMessages} />}
        onClick={redirectMap.toMessages}
      >
        {t('header.messages')}
      </Button>
      <Button color="primary" startIcon={<UserListIcon />} onClick={redirectMap.toContacts}>
        {t('header.contacts')}
      </Button>
      <LanguageSelect />
      <Button color="primary" onClick={handleClick} ref={ref}>
        <CurrentUser />
        <ArrowDownIcon />
      </Button>
      <PopupMenu anchorEl={ref.current} open={isOpen} onClose={handleClose}>
        <MenuItem onClick={redirectMap.toAccount}>
          <AccountIcon className={classes.image} />
          {t('header.account')}
        </MenuItem>
        <MenuItem onClick={redirectMap.toRootAndLogout}>
          <LogoutIcon className={classes.image} />
          {t('header.logout')}
        </MenuItem>
      </PopupMenu>
    </>
  );

  return <Box className={classes.root}>{isAuthenticated ? authenticatedMenu : unauthenticatedMenu}</Box>;
};

export default compose(withAuthState)(HorizontalMenu);
