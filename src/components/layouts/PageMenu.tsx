import React from 'react';
import FHStack from '../boxes/FHStack';
import {IconButton, Tooltip, useMediaQuery, useTheme} from '@mui/material';
import PopupMenu, {PopupMenuItem, PopupMenuItemProps} from '../surfaces/PopupMenu';
import DotsVerticalIcon from '../icons/DotsVerticalIcon';

export type PageMenuItem = PopupMenuItemProps;

type PageMenuProps = {
  items: PageMenuItem[];
  fullView?: boolean;
  compactView?: boolean;
};

const PageMenu = ({items, fullView, compactView}: PageMenuProps) => {
  const theme = useTheme();
  const isSmallDevice = useMediaQuery(theme.breakpoints.down('md'));

  const showMenu = items.filter((item) => !item.hidden).length > 0;

  const regularMenu = (
    <>
      {items
        .filter((itemProps) => !itemProps.hidden)
        .map((itemProps) => (
          <Tooltip title={itemProps.text} key={itemProps.text}>
            <IconButton color={itemProps.color} disabled={itemProps.disabled} onClick={itemProps.action}>
              {itemProps.icon}
            </IconButton>
          </Tooltip>
        ))}
    </>
  );

  const popupMenu = (
    <PopupMenu
      trigger={
        <IconButton color="primary" size={compactView ? 'small' : undefined}>
          <DotsVerticalIcon />
        </IconButton>
      }
    >
      {items.map((itemProps, index) => (
        <PopupMenuItem {...itemProps} key={index} />
      ))}
    </PopupMenu>
  );

  return showMenu ? (
    <FHStack flexGrow={1} spacing={1} justifyContent="flex-end">
      {(isSmallDevice && !fullView) || compactView ? popupMenu : regularMenu}
    </FHStack>
  ) : null;
};

export default PageMenu;
