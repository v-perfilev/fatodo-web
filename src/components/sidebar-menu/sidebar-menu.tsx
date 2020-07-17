import * as React from 'react';
import {FC, PropsWithChildren} from 'react';
import {Box, Drawer} from '@material-ui/core';
import Logo from '../common/logo';
import cx from 'classnames';
import {drawerStyles} from './_styles';

type Props = PropsWithChildren<any> & {
  left?: boolean;
}

const SidebarMenu: FC<Props> = ({left, children}: Props) => {
  const classes = drawerStyles();

  return (
      <Drawer variant="permanent" anchor={left ? 'left' : 'bottom'}
              className={classes.root} classes={{paper: classes.root}}>
        <Box className={classes.container}>
          {left && (
            <Box className={classes.logo}>
              <Logo />
            </Box>
          )}
          {children}
        </Box>
      </Drawer>
  );
};

export default SidebarMenu;
