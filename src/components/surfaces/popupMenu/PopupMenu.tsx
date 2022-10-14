import React from 'react';
import {Fade, Menu, PopoverOrigin, PopoverProps} from '@mui/material';

type PopupMenuProps = PopoverProps;

const PopupMenu = ({children, ...props}: PopupMenuProps) => {
  const menuListProps = {
    disablePadding: true,
  };

  const anchorOrigin = {
    vertical: 'bottom',
    horizontal: 'center',
  } as PopoverOrigin;

  const transformOrigin = {
    vertical: 'top',
    horizontal: 'center',
  } as PopoverOrigin;

  return (
    <Menu
      TransitionComponent={Fade}
      MenuListProps={menuListProps}
      anchorEl={null}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      {...props}
    >
      {children}
    </Menu>
  );
};

export default PopupMenu;
