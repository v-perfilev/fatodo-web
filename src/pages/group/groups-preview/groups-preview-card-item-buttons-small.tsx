import React, {FC, useCallback, useRef, useState} from 'react';
import {PopupMenu} from '../../../components/surfaces';
import {PopupMenuItem, PopupMenuItemProps} from '../../../components/surfaces/popup-menu/popup-menu-item';
import {Box, IconButton} from '@material-ui/core';
import {DotsVerticalIcon} from '../../../components/icons/dots-vertical-icon';

type Props = {
  menuItems: PopupMenuItemProps[];
};

const GroupsPreviewCardItemButtonsSmall: FC<Props> = ({menuItems}: Props) => {
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
        <Box>
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
        </Box>
      </PopupMenu>
    </>
  );
};

export default GroupsPreviewCardItemButtonsSmall;
