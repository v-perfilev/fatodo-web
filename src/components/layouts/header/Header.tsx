import React, {useState} from 'react';
import HorizontalMenu from './HorizontalMenu';
import {HEADER_HEIGHT} from '../../../constants';
import SidebarMenu from './SidebarMenu';
import {AppBar, Hidden, IconButton, Slide, SxProps, Toolbar, useScrollTrigger} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {RootRoutes} from '../../../routes/RootRouter';
import {RedirectMap} from './type';
import {useAppDispatch} from '../../../store/store';
import {AuthActions} from '../../../store/auth/authActions';
import LogoWithText from '../../images/LogoWithText';
import MenuIcon from '../../icons/MenuIcon';
import FHStack from '../../boxes/FHStack';
import {GroupRouteUtils} from '../../../routes/GroupRouter';
import {ChatRouteUtils} from '../../../routes/ChatRouter';
import {ContactRouteUtils} from '../../../routes/ContactRouter';
import {AccountRouteUtils} from '../../../routes/AccountRouter';

type HeaderProps = {
  flexible?: boolean;
};

const Header = ({flexible}: HeaderProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const trigger = useScrollTrigger({disableHysteresis: true});
  const [showMenu, setShowMenu] = useState(false);

  const redirectMap = {
    toGroups: (): void => {
      setShowMenu(false);
      navigate(GroupRouteUtils.getListUrl());
    },
    toChats: (): void => {
      setShowMenu(false);
      navigate(ChatRouteUtils.getListUrl());
    },
    toContacts: (): void => {
      setShowMenu(false);
      navigate(ContactRouteUtils.getListUrl());
    },
    toAccountMain: (): void => {
      setShowMenu(false);
      navigate(AccountRouteUtils.getMainUrl());
    },
    toAccountSettings: (): void => {
      setShowMenu(false);
      navigate(AccountRouteUtils.getSettingsUrl());
    },
    toAccountChangePassword: (): void => {
      setShowMenu(false);
      navigate(AccountRouteUtils.getChangePasswordUrl());
    },
    logout: (): void => {
      setShowMenu(false);
      dispatch(AuthActions.logout());
      navigate(RootRoutes.LOGIN);
    },
  } as RedirectMap;

  const toggleMenu = (): void => setShowMenu((prevState) => !prevState);

  return (
    <Slide appear={false} in={!flexible || !trigger}>
      <AppBar sx={appbarStyles} variant="outlined" elevation={0}>
        <Toolbar sx={toolbarStyles}>
          <FHStack>
            <LogoWithText href={RootRoutes.ROOT} />
          </FHStack>
          <Hidden lgDown>
            <HorizontalMenu redirectMap={redirectMap} />
          </Hidden>
          <Hidden lgUp>
            <IconButton color="primary" onClick={toggleMenu}>
              <MenuIcon />
            </IconButton>
            <SidebarMenu show={showMenu} onToggle={toggleMenu} redirectMap={redirectMap} />
          </Hidden>
        </Toolbar>
      </AppBar>
    </Slide>
  );
};

const appbarStyles: SxProps = {
  height: HEADER_HEIGHT,
  minHeight: HEADER_HEIGHT,
  backgroundColor: 'background.paper',
};

const toolbarStyles: SxProps = {
  height: HEADER_HEIGHT,
  minHeight: `${HEADER_HEIGHT}px !important`,
  paddingX: 1,
  justifyContent: 'space-between',
};

export default Header;
