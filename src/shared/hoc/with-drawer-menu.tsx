import * as React from 'react';
import {ComponentType, FC, ReactElement, useState} from 'react';
import {Box, Drawer, Hidden} from '@material-ui/core';
import {drawerMenuStyles} from './_styles';
import Logo from '../../components/common/logo';

export type DrawerProps = {
  setMenu: (menu) => void;
};

type DrawerMenuProps = {
  left?: boolean;
};

export const DrawerSpacer: FC = () => {
  const style = {flexGrow: 1};
  return <Box style={style} />;
};

const withDrawerMenu = (Component: ComponentType<DrawerProps>): FC => (props): ReactElement => {
  const classes = drawerMenuStyles();
  const [menu, setMenu] = useState(null);

  const DrawerMenu: FC<DrawerMenuProps> = ({left}: DrawerMenuProps) => (
    <Drawer
      variant="permanent"
      anchor={left ? 'left' : 'bottom'}
      className={classes.drawer}
      classes={{paper: classes.drawer}}
    >
      {left && (
        <Box className={classes.logo}>
          <Logo />
        </Box>
      )}
      <Box className={classes.container}>{menu}</Box>
    </Drawer>
  );

  return (
    <Box className={classes.root}>
      <Hidden xsDown>
        <DrawerMenu left />
      </Hidden>
      <Component {...props} setMenu={setMenu} />
      <Hidden smUp>
        <DrawerMenu />
      </Hidden>
    </Box>
  );
};

export default withDrawerMenu;
