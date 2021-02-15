import {RootState} from '../../../../store';
import * as React from 'react';
import {FC, useRef, useState} from 'react';
import {connect, ConnectedProps} from 'react-redux';
import Button from '@material-ui/core/Button';
import {Box, MenuItem} from '@material-ui/core';
import {logout} from '../../../../store/actions/auth.actions';
import {useTranslation} from 'react-i18next';
import {horizontalMenuStyles} from './_styles';
import {AuthState} from '../../../../store/rerducers/auth.reducer';
import {LoginIcon} from '../../icons/login-icon';
import {LogoutIcon} from '../../icons/logout-icon';
import {SignUpIcon} from '../../icons/signup-icon';
import {compose} from 'recompose';
import {Routes} from '../../../router';
import {useHistory, withRouter} from 'react-router-dom';
import {LanguageSelect} from '../../controls';
import CurrentUser from '../current-user';
import {ArrowDownIcon} from '../../icons/arrow-down-icon';
import {PopupMenu} from '../../surfaces';
import {AccountIcon} from '../../icons/account-icon';
import {UserListIcon} from '../../icons/user-list-icon';
import {MessageIcon} from '../../icons/message-icon';

const mapStateToProps = (state: RootState): {authState: AuthState} => ({authState: state.authState});
const mapDispatchToProps = {logout};
const connector = connect(mapStateToProps, mapDispatchToProps);

type Props = ConnectedProps<typeof connector>;

const HorizontalMenu: FC<Props> = ({authState: {isAuthenticated}, logout}: Props) => {
  const classes = horizontalMenuStyles();
  const {t} = useTranslation();
  const history = useHistory();
  const ref = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const redirectToLogin = (): void => history.push(Routes.LOGIN);
  const redirectToRegistration = (): void => history.push(Routes.REGISTRATION);
  const redirectToAccount = (): void => history.push(Routes.ACCOUNT);
  const redirectToMessages = (): void => history.push(Routes.MESSAGES);
  const redirectToContacts = (): void => history.push(Routes.CONTACTS);
  const redirectAndLogout = (): void => {
    history.push(Routes.ROOT);
    logout();
  };

  const handleClick = (): void => setIsOpen(true);
  const handleClose = (): void => setIsOpen(false);

  const unauthenticatedMenu = (
    <>
      <Button color="primary" startIcon={<LoginIcon />} onClick={redirectToLogin}>
        {t('header.login')}
      </Button>
      <Button variant="contained" color="secondary" startIcon={<SignUpIcon />} onClick={redirectToRegistration}>
        {t('header.register')}
      </Button>
    </>
  );

  const authenticatedMenu = (
    <>
      <Button color="primary" startIcon={<MessageIcon />} onClick={redirectToMessages}>
        {t('header.messages')}
      </Button>
      <Button color="primary" startIcon={<UserListIcon />} onClick={redirectToContacts}>
        {t('header.contacts')}
      </Button>
      <Button color="primary" onClick={handleClick} ref={ref}>
        <CurrentUser />
        <ArrowDownIcon />
      </Button>
      <PopupMenu anchorEl={ref.current} open={isOpen} onClose={handleClose}>
        <MenuItem onClick={redirectToAccount}>
          <AccountIcon className={classes.image} />
          {t('header.account')}
        </MenuItem>
        <MenuItem onClick={redirectAndLogout}>
          <LogoutIcon className={classes.image} />
          {t('header.logout')}
        </MenuItem>
      </PopupMenu>
    </>
  );

  return (
    <Box className={classes.root}>
      <LanguageSelect />
      {isAuthenticated ? authenticatedMenu : unauthenticatedMenu}
    </Box>
  );
};

export default compose(connector, withRouter)(HorizontalMenu);
