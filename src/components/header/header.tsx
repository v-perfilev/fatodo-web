import * as React from 'react';
import {FC} from 'react';
import {
  AppBar,
  Box,
  createStyles,
  IconButton,
  StyleRules,
  Theme,
  Toolbar,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Logo from './logo';
import Language from './language';
import Account from './account';

const styles = (theme: Theme): StyleRules<any> =>
  createStyles({
    root: {
      marginLeft: theme.spacing(-2),
      marginRight: theme.spacing(-2),
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(0),
    },
  });

type Props = WithStyles<typeof styles>;

const Header: FC<any> = ({classes}: Props) => (
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
