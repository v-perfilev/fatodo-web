import * as React from 'react';
import {FC, useState} from 'react';
import {AppBar, Box, Hidden, IconButton, Slide, Toolbar, useScrollTrigger} from '@material-ui/core';
import HorizontalMenu from './horizontal-menu';
import {headerStyles} from './_styles';
import {MenuIcon} from '../../icons/menu-icon';
import {LogoWithText} from '../logo';
import {SidebarMenu} from './sidebar-menu';

type Props = {
  flexible?: boolean;
};

export const Header: FC<Props> = ({flexible}: Props) => {
  const classes = headerStyles();
  const [showMenu, setShowMenu] = useState(false);
  const trigger = useScrollTrigger({disableHysteresis: true});

  const toggleMenu = (): void => setShowMenu((prevState) => !prevState);

  return (
    <Slide appear={false} in={!flexible || !trigger}>
      <AppBar elevation={3} className={classes.appbar}>
        <Toolbar className={classes.toolbar}>
          <LogoWithText />
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
    </Slide>
  );
};