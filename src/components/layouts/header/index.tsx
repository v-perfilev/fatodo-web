import * as React from 'react';
import {FC, useState} from 'react';
import {AppBar, Hidden, IconButton, Slide, Toolbar, useScrollTrigger} from '@material-ui/core';
import HorizontalMenu from './horizontal-menu';
import {headerStyles} from './_styles';
import {MenuIcon} from '../../icons/menu-icon';
import {LogoWithText} from '../logo';
import {SidebarMenu} from './sidebar-menu';
import {logout} from '../../../store/actions/auth.actions';
import {connect, ConnectedProps} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {Routes} from '../../../pages/router';
import {RedirectMap} from './type';
import {Grower} from '../../surfaces';

const mapDispatchToProps = {logout};
const connector = connect(null, mapDispatchToProps);

type BaseProps = {
  flexible?: boolean;
};

type Props = ConnectedProps<typeof connector> & BaseProps;

const Header: FC<Props> = ({flexible, logout}: Props) => {
  const classes = headerStyles();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();
  const trigger = useScrollTrigger({disableHysteresis: true});

  const redirectMap = {
    toLogin: (): void => history.push(Routes.LOGIN),
    toRegistration: (): void => history.push(Routes.REGISTRATION),
    toAccount: (): void => history.push(Routes.ACCOUNT),
    toGroups: (): void => history.push(Routes.GROUPS),
    toChats: (): void => history.push(Routes.CHATS),
    toContacts: (): void => history.push(Routes.CONTACTS),
    toRootAndLogout: (): void => {
      history.push(Routes.ROOT);
      logout();
    },
  } as RedirectMap;

  const toggleMenu = (): void => setShowMenu((prevState) => !prevState);

  return (
    <Slide appear={false} in={!flexible || !trigger}>
      <AppBar elevation={3} className={classes.appbar}>
        <Toolbar className={classes.toolbar}>
          <LogoWithText href={Routes.ROOT} />
          <Grower />
          <Hidden smDown>
            <HorizontalMenu redirectMap={redirectMap} />
          </Hidden>
          <Hidden mdUp>
            <IconButton color="primary" onClick={toggleMenu} className={classes.menuButton}>
              <MenuIcon />
            </IconButton>
            <SidebarMenu show={showMenu} onToggle={toggleMenu} redirectMap={redirectMap} />
          </Hidden>
        </Toolbar>
      </AppBar>
    </Slide>
  );
};

export default connector(Header);
