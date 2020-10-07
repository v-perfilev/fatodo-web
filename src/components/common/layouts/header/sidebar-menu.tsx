import * as React from 'react';
import {FC} from 'react';
import {Box, Divider, Fab, SwipeableDrawer, Toolbar} from '@material-ui/core';
import {ArrowRightIcon} from '../../icons/arrow-right-icon';
import VerticalMenu from './vertical-menu';
import {sidebarMenuStyles} from './_styles';
import {LanguageSelect} from '../../controls/language-select';

type Props = {
  show: boolean;
  onToggle: () => void;
};

export const SidebarMenu: FC<Props> = ({show, onToggle}: Props) => {
  const classes = sidebarMenuStyles();

  return (
    <SwipeableDrawer anchor="right" open={show} onOpen={onToggle} onClose={onToggle}>
      <Box className={classes.root}>
        <Toolbar>
          <Fab size="small" color="primary" onClick={onToggle} className={classes.menuButton}>
            <ArrowRightIcon />
          </Fab>
        </Toolbar>
        <Divider />
        <VerticalMenu />
        <Box className={classes.grow} />
        <LanguageSelect list />
      </Box>
    </SwipeableDrawer>
  );
};
