import React from 'react';
import VerticalMenu from './VerticalMenu';
import {RedirectMap} from './type';
import ArrowRightIcon from '../../icons/ArrowRightIcon';
import LanguageSelect from '../../controls/LanguageSelect';
import {Divider, Fab, SwipeableDrawer, SxProps, Toolbar} from '@mui/material';
import {HEADER_HEIGHT} from '../../../constants';
import FBox from '../../boxes/FBox';
import FCenter from '../../boxes/FCenter';

type SidebarMenuProps = {
  show: boolean;
  onToggle: () => void;
  redirectMap: RedirectMap;
};

const SidebarMenu = ({show, onToggle, redirectMap}: SidebarMenuProps) => {
  return (
    <SwipeableDrawer anchor="right" open={show} onOpen={onToggle} onClose={onToggle}>
      <FBox sx={containerStyles}>
        <Toolbar sx={toolbarStyles}>
          <Fab size="small" color="primary" onClick={onToggle}>
            <ArrowRightIcon />
          </Fab>
        </Toolbar>
        <Divider />
        <VerticalMenu redirectMap={redirectMap} />
        <FCenter paddingY={2}>
          <LanguageSelect />
        </FCenter>
      </FBox>
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
  height: HEADER_HEIGHT - 1,
  display: 'flex',
  flexDirection: 'row-reverse',
  justifyContent: 'space-between',
  paddingLeft: 2,
  paddingRight: 2,
};

export default SidebarMenu;
