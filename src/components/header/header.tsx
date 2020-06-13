import * as React from 'react';
import {FC} from 'react';
import {AppBar, Box, Hidden, Toolbar} from '@material-ui/core';
import Logo from '../common/logo';
import LanguageSelect from '../common/language-select';
import Account from './account';
import {headerStyles} from './_styles';

const Header: FC = () => {
  const classes = headerStyles();

  return (
    <AppBar position="static" color="transparent" className={classes.root}>
      <Toolbar className={classes.toolbar}>
        <Box className={classes.grow}>
          <Logo />
        </Box>
        <Hidden smDown>
          <LanguageSelect />
          <Account />
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
