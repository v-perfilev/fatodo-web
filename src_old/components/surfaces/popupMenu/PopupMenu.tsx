import React, {HTMLAttributes} from 'react';
import {Fade, Menu, PopoverOrigin, PopoverProps} from '@material-ui/core';

type PopupMenuProps = HTMLAttributes<HTMLElement> & PopoverProps;

const PopupMenu = ({children, className, ...props}: PopupMenuProps) => {
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
      getContentAnchorEl={null}
      anchorOrigin={anchorOrigin}
      transformOrigin={transformOrigin}
      className={className}
      {...props}
    >
      {children}
    </Menu>
  );
};

export default PopupMenu;
