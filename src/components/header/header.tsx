import * as React from 'react';
import {FC} from 'react';
import {AppBar, Box, IconButton, Toolbar} from '@material-ui/core';
import Logo from './logo';
import LanguageSelect from './language-select';
import Account from './account';
import {headerStyles} from './_styles';
import {Menu} from '@material-ui/icons';

const useStyles = headerStyles;

const Header: FC = () => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar className={classes.root}>
        <IconButton edge="start" color="inherit" className={classes.menuButton}>
          <Menu />
        </IconButton>
        <Box className={classes.grow}>
          <Logo />
        </Box>
        <LanguageSelect />
        <Account />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
