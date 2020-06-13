import * as React from 'react';
import {FC, useState} from 'react';
import {AppBar, Box, Hidden, IconButton, Toolbar} from '@material-ui/core';
import Logo from '../common/logo';
import HorizontalMenu from './horizontal-menu';
import {headerStyles} from './_styles';
import {MenuIcon} from '../common/icons/menu-icon';
import SidebarMenu from './sidebar-menu';

const Header: FC = () => {
  const classes = headerStyles();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = (): void => setShowMenu((prevState) => !prevState);

  return (
    <AppBar position="static" color="transparent" className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <Logo />
        <Box className={classes.grow} />
        <Hidden smDown>
          <HorizontalMenu />
        </Hidden>
        <Hidden mdUp>
          <IconButton color="primary" onClick={toggleMenu} className={classes.menuButton}>
            <MenuIcon />
          </IconButton>
          <SidebarMenu show={showMenu} onToggle={toggleMenu} />
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
