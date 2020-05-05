import * as React from 'react';
import {FC} from 'react';
import {AppBar, Box, IconButton, Toolbar} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Logo from './logo';
import Language from './language';
import Account from './account';
import {headerStyles} from './_styles';

const useStyles = headerStyles;

const Header: FC = () => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar className={classes.root}>
        <IconButton edge="start" color="inherit" className={classes.menuButton}>
          <MenuIcon />
        </IconButton>
        <Box className={classes.grow}>
          <Logo />
        </Box>
        <Language />
        <Account />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
