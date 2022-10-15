import React from 'react';
import VerticalMenu from './VerticalMenu';
import {RedirectMap} from './type';
import ArrowRightIcon from '../../icons/ArrowRightIcon';
import LanguageSelect from '../../controls/LanguageSelect';
import {Box, Divider, Fab, SwipeableDrawer, SxProps, Toolbar} from '@mui/material';
import {HEADER_HEIGHT} from '../../../constants';

type SidebarMenuProps = {
  show: boolean;
  onToggle: () => void;
  redirectMap: RedirectMap;
};

const SidebarMenu = ({show, onToggle, redirectMap}: SidebarMenuProps) => {
  return (
    <SwipeableDrawer anchor="right" open={show} onOpen={onToggle} onClose={onToggle}>
      <Box sx={containerStyles}>
        <Toolbar sx={toolbarStyles}>
          <Fab size="small" color="primary" onClick={onToggle}>
            <ArrowRightIcon />
          </Fab>
        </Toolbar>
        <Divider />
        <VerticalMenu redirectMap={redirectMap} />
        <LanguageSelect list />
      </Box>
    </SwipeableDrawer>
  );
};

const containerStyles: SxProps = {
  minWidth: 200,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
};

const toolbarStyles: SxProps = {
  height: HEADER_HEIGHT,
  display: 'flex',
  flexDirection: 'row-reverse',
  justifyContent: 'space-between',
  paddingLeft: 2,
  paddingRight: 2,
};

export default SidebarMenu;
