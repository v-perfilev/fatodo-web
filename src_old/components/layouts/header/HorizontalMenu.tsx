import React, {useRef, useState} from 'react';
import Button from '@material-ui/core/Button';
import {Box, MenuItem, Theme} from '@material-ui/core';
import {useTranslation} from 'react-i18next';
import {AuthState} from '../../../store/rerducers/auth.reducer';
import CurrentUser from '../ControlUser';
import {PopupMenu} from '../../surfaces';
import {useUnreadMessagesContext} from '../../../shared/contexts/chat-contexts/unread-messages-context';
import BadgeMessageIcon from '../../icons/badgeIcons/BadgeMessageIcon';
import {RedirectMap} from './type';
import withAuthState from '../../../shared/hocs/with-auth-state/with-auth-state';
import {useContactInfoContext} from '../../../shared/contexts/contact-contexts/contact-info-context';
import BadgeContactInfo from '../../icons/badgeIcons/BadgeContactIcon';
import {makeStyles} from '@material-ui/core/styles';
import LanguageSelect from '../../controls/LanguageSelect';
import LoginIcon from '../../icons/LoginIcon';
import SignUpIcon from '../../icons/SignUpIcon';
import GroupsIcon from '../../icons/GroupsIcon';
import ArrowDownIcon from '../../icons/ArrowDownIcon';
import AccountIcon from '../../icons/AccountIcon';
import LogoutIcon from '../../icons/LogoutIcon';

type HorizontalMenuProps = AuthState & {
  redirectMap: RedirectMap;
};
const HorizontalMenu = ({redirectMap, isAuthenticated}: HorizontalMenuProps) => {
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
      <PopupMenu anchorEl={ref?.current} open={isOpen} onClose={handleClose}>
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

const horizontalMenuStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    '& > *': {
      marginRight: theme.spacing(2),
      '&:last-child': {
        marginRight: theme.spacing(0),
      },
    },
  },
}));

export default withAuthState(HorizontalMenu);
