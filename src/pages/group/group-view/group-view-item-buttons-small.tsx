import React, {FC, useCallback, useRef, useState} from 'react';
import {PopupMenu} from '../../../components/surfaces';
import {IconButton} from '@material-ui/core';
import {DotsVerticalIcon} from '../../../components/icons/dots-vertical-icon';
import {PopupMenuItem, PopupMenuItemProps} from '../../../components/surfaces/popup-menu/popup-menu-item';

type Props = {
  menuItems: PopupMenuItemProps[];
};

const GroupViewItemButtonsSmall: FC<Props> = ({menuItems}: Props) => {
  const ref = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = useCallback((e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(true);
  }, []);

  const handleClose = useCallback((e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(false);
  }, []);

  return (
    <>
      <IconButton onClick={handleOpen} size="small" ref={ref}>
        <DotsVerticalIcon />
      </IconButton>
      <PopupMenu anchorEl={ref?.current} open={isOpen} onClose={handleClose}>
        {menuItems.map((item, index) => (
          <PopupMenuItem
            action={item.action}
            icon={item.icon}
            text={item.text}
            loading={item.loading}
            disabled={item.disabled}
            show={item.show}
            key={index}
          />
        ))}
      </PopupMenu>
    </>
  );
};

export default GroupViewItemButtonsSmall;
