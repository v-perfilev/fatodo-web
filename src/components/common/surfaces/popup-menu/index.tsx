import * as React from 'react';
import {FC, HTMLAttributes} from 'react';
import {Fade, Menu, PopoverOrigin, PopoverProps} from '@material-ui/core';

type Props = HTMLAttributes<HTMLElement> & PopoverProps;

export const PopupMenu: FC<Props> = ({children, className, ...props}: Props) => {
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
