import * as React from 'react';
import { AppBar, Box, createStyles, IconButton, Theme, Toolbar, withStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Logo from './logo';
import Account from './account';

const styles = (theme: Theme) => createStyles({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  white: {
    color: 'white',
  },
});

const Header = (props) => {
  const {classes} = props;
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" className={classes.menuButton}>
          <MenuIcon/>
        </IconButton>
        <Box className={classes.grow}>
          <Logo/>
        </Box>
        <Account/>
      </Toolbar>
    </AppBar>
  );
}

export default withStyles(styles)(Header);
