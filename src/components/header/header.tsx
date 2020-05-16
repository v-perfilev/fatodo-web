import * as React from 'react';
import {FC} from 'react';
import {AppBar, Box, Toolbar} from '@material-ui/core';
import Logo from './logo';
import LanguageSelect from './language-select';
import Account from './account';
import {headerStyles} from './_styles';

const useStyles = headerStyles;

const Header: FC = () => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar className={classes.root}>
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
