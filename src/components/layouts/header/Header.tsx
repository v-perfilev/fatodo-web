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

type HeaderProps = {
  flexible?: boolean;
};

const Header = ({flexible}: HeaderProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const trigger = useScrollTrigger({disableHysteresis: true});
  const [showMenu, setShowMenu] = useState(false);

  const redirectMap = {
    toAccount: (): void => navigate(RootRoutes.ACCOUNT),
    toGroups: (): void => navigate(RootRoutes.GROUPS),
    toChats: (): void => navigate(RootRoutes.CHATS),
    toContacts: (): void => navigate(RootRoutes.CONTACTS),
    logout: (): void => {
      dispatch(AuthActions.logout());
      navigate(RootRoutes.LOGIN);
    },
  } as RedirectMap;

  const toggleMenu = (): void => setShowMenu((prevState) => !prevState);

  return (
    <Slide appear={false} in={!flexible || !trigger}>
      <AppBar sx={appbarStyles} variant="outlined" elevation={0}>
        <Toolbar sx={toolbarStyles}>
          <LogoWithText href={RootRoutes.ROOT} />
          <Hidden smDown>
            <HorizontalMenu redirectMap={redirectMap} />
          </Hidden>
          <Hidden mdUp>
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
