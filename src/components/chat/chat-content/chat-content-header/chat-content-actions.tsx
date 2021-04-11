import React, {FC, MouseEvent, useRef, useState} from 'react';
import {IconButton, MenuItem} from '@material-ui/core';
import {chatContentHeaderActionsStyles} from './_styles';
import {Chat} from '../../../../models/chat.model';
import {DotsVerticalIcon} from '../../../common/icons/dots-vertical-icon';
import {PopupMenu} from '../../../common/surfaces';
import {useTranslation} from 'react-i18next';
import {DeleteIcon} from '../../../common/icons/delete-icon';
import {BroomIcon} from '../../../common/icons/broom-icon';
import {LeaveIcon} from '../../../common/icons/leave-icon';

type Props = {
  chat: Chat;
};

const ChatContentActions: FC<Props> = ({}: Props) => {
  const classes = chatContentHeaderActionsStyles();
  const {t} = useTranslation();
  const ref = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const handleClickOnAction = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(true);
  };

  const handleClose = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(false);
  };

  const cleanChat = (e: MouseEvent<HTMLElement>): void => {
    console.log('clean chat');
    handleClose(e);
  };

  const leaveChat = (e: MouseEvent<HTMLElement>): void => {
    console.log('leave chat');
    handleClose(e);
  };

  const deleteChat = (e: MouseEvent<HTMLElement>): void => {
    console.log('delete chat');
    handleClose(e);
  };

  return (
    <>
      <IconButton onClick={handleClickOnAction} ref={ref}>
        <DotsVerticalIcon />
      </IconButton>
      <PopupMenu className={classes.popupMenu} anchorEl={ref.current} open={isOpen} onClose={handleClose}>
        <MenuItem onClick={cleanChat}>
          <BroomIcon />
          {t('chat:menu.cleanChat')}
        </MenuItem>
        <MenuItem onClick={leaveChat}>
          <LeaveIcon />
          {t('chat:menu.leaveChat')}
        </MenuItem>
        <MenuItem className={classes.red} onClick={deleteChat}>
          <DeleteIcon />
          {t('chat:menu.deleteChat')}
        </MenuItem>
      </PopupMenu>
    </>
  );
};

export default ChatContentActions;
