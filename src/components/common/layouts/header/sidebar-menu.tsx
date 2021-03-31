import * as React from 'react';
import {FC} from 'react';
import {Box, Divider, Fab, SwipeableDrawer, Toolbar} from '@material-ui/core';
import {ArrowRightIcon} from '../../icons/arrow-right-icon';
import VerticalMenu from './vertical-menu';
import {sidebarMenuStyles} from './_styles';
import {LanguageSelect} from '../../controls';
import {RedirectMap} from './type';

type Props = {
  show: boolean;
  onToggle: () => void;
  redirectMap: RedirectMap;
};

export const SidebarMenu: FC<Props> = ({show, onToggle, redirectMap}: Props) => {
  const classes = sidebarMenuStyles();

  return (
    <SwipeableDrawer anchor="right" open={show} onOpen={onToggle} onClose={onToggle}>
      <Box className={classes.root}>
        <Toolbar className={classes.toolbar}>
          <Fab size="small" color="primary" onClick={onToggle}>
            <ArrowRightIcon />
          </Fab>
        </Toolbar>
        <Divider />
        <VerticalMenu redirectMap={redirectMap} />
        <Box className={classes.grow} />
        <LanguageSelect list />
      </Box>
    </SwipeableDrawer>
  );
};
