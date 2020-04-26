import * as React from 'react';
import { AppBar, Box, createStyles, IconButton, Theme, Toolbar, WithStyles, withStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Logo from './logo';
import Language from './language';
import Account from './account';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: theme.spacing(-2),
      marginRight: theme.spacing(0),
    },
  });

type Props = WithStyles<typeof styles>;

const Header = ({ classes }: Props) => (
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

export default withStyles(styles)(Header);
