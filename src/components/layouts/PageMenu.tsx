import React from 'react';
import FHStack from '../boxes/FHStack';
import {IconButton, Tooltip, useMediaQuery, useTheme} from '@mui/material';
import PopupMenu, {PopupMenuItem, PopupMenuItemProps} from '../surfaces/PopupMenu';
import DotsVerticalIcon from '../icons/DotsVerticalIcon';

export type PageMenuItem = PopupMenuItemProps;

type PageMenu = {
  items: PageMenuItem[];
};

const PageMenu = ({items}: PageMenu) => {
  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('sm'));

  const regularMenu = (
    <>
      {items.map((itemProps, index) => (
        <Tooltip title={itemProps.text} key={index}>
          <IconButton color={itemProps.color} onClick={itemProps.action}>
            {itemProps.icon}
          </IconButton>
        </Tooltip>
      ))}
    </>
  );

  const popupMenu = (
    <PopupMenu
      trigger={
        <IconButton>
          <DotsVerticalIcon color="primary" />
        </IconButton>
      }
    >
      {items.map((itemProps, index) => (
        <PopupMenuItem {...itemProps} key={index} />
      ))}
    </PopupMenu>
  );

  return (
    <FHStack flexGrow={1} justifyContent="flex-end">
      {isSmallDevice ? popupMenu : regularMenu}
    </FHStack>
  );
};

export default PageMenu;
