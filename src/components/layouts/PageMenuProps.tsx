import React from 'react';
import FHStack from '../boxes/FHStack';
import {IconButton, Tooltip, useMediaQuery, useTheme} from '@mui/material';
import PopupMenu, {PopupMenuItem, PopupMenuItemProps} from '../surfaces/PopupMenu';
import DotsVerticalIcon from '../icons/DotsVerticalIcon';

export type PageMenuItem = PopupMenuItemProps;

type PageMenuProps = {
  items: PageMenuItem[];
  compactView?: boolean;
};

const PageMenu = ({items, compactView}: PageMenuProps) => {
  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('md'));

  const regularMenu = (
    <>
      {items.map((itemProps) => (
        <Tooltip title={itemProps.text} key={itemProps.text}>
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
    <FHStack flexGrow={1} spacing={1} justifyContent="flex-end">
      {isSmallDevice || compactView ? popupMenu : regularMenu}
    </FHStack>
  );
};

export default PageMenu;
