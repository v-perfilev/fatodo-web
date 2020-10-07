import * as React from 'react';
import {FC, HTMLAttributes} from 'react';
import {Fade, Menu} from '@material-ui/core';

type Props = HTMLAttributes<HTMLElement> & {
  anchorEl: HTMLElement;
  isOpen: boolean;
  onClose: (e: React.MouseEvent<HTMLElement>) => void;
};

export const PopupMenu: FC<Props> = ({anchorEl, isOpen, onClose, children, className}: Props) => {
  return (
    <Menu
      anchorEl={anchorEl}
      keepMounted
      open={isOpen}
      onClose={onClose}
      TransitionComponent={Fade}
      MenuListProps={{disablePadding: true}}
      className={className}
    >
      {children}
    </Menu>
  );
};
