import * as React from 'react';
import {FC, ReactNode} from 'react';
import {Box, Hidden} from '@material-ui/core';
import SidebarMenu from './sidebar-menu';
import {containerStyles} from './_styles';

type Props = {
  menu: ReactNode;
  content: ReactNode;
};

const ContainerWithSidebar: FC<Props> = ({menu, content}: Props) => {
  const classes = containerStyles();

  return (
    <Box className={classes.root}>
      <Hidden xsDown>
        <SidebarMenu left>{menu}</SidebarMenu>
      </Hidden>
      {content}
      <Hidden smUp>
        <SidebarMenu>{menu}</SidebarMenu>
      </Hidden>
    </Box>
  );
};

export default ContainerWithSidebar;
