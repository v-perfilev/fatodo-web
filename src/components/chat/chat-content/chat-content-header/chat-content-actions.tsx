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
import {MembersIcon} from '../../../common/icons/members-icon';
import {UserPlusIcon} from '../../../common/icons/user-plus-icon';
import ChatService from '../../../../services/chat.service';
import {useSnackContext} from '../../../../shared/contexts/snack-context';
import {EditIcon} from '../../../common/icons/edit-icon';
import {useUserListContext} from '../../../../shared/contexts/list-contexts/user-list-context';
import {useChatDialogContext} from '../../../../shared/contexts/dialog-contexts/chat-dialog-context';

type Props = {
  chat: Chat;
  title: string;
  closeChat: () => void;
  clearMessages: () => void;
};

const ChatContentActions: FC<Props> = ({chat, title, closeChat, clearMessages}: Props) => {
  const classes = chatContentHeaderActionsStyles();
  const {users} = useUserListContext();
  const {handleResponse} = useSnackContext();
  const {t} = useTranslation();
  const ref = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const {showChatAddMembersDialog, showChatMembersDialog, showChatRenameDialog} = useChatDialogContext();

  const openChatAddMembersDialog = (): void => {
    showChatAddMembersDialog(chat);
  };

  const openChatMembersDialog = (): void => {
    showChatMembersDialog(chat, users);
  };

  const openChatRenameDialog = (): void => {
    showChatRenameDialog(chat, title);
  };

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

  const showMembers = (e: MouseEvent<HTMLElement>): void => {
    openChatMembersDialog();
    handleClose(e);
  };

  const addMembers = (e: MouseEvent<HTMLElement>): void => {
    openChatAddMembersDialog();
    handleClose(e);
  };

  const renameChat = (e: MouseEvent<HTMLElement>): void => {
    openChatRenameDialog();
    handleClose(e);
  };

  const cleanChat = (e: MouseEvent<HTMLElement>): void => {
    ChatService.cleanChat(chat.id).catch((response) => {
      handleResponse(response);
    });
    handleClose(e);
    clearMessages();
  };

  const leaveChat = (e: MouseEvent<HTMLElement>): void => {
    ChatService.leaveChat(chat.id).catch((response) => {
      handleResponse(response);
    });
    handleClose(e);
    closeChat();
  };

  const deleteChat = (e: MouseEvent<HTMLElement>): void => {
    ChatService.deleteChat(chat.id).catch((response) => {
      handleResponse(response);
    });
    handleClose(e);
    closeChat();
  };

  return (
    <>
      <IconButton onClick={handleClickOnAction} ref={ref}>
        <DotsVerticalIcon />
      </IconButton>
      <PopupMenu className={classes.popupMenu} anchorEl={ref.current} open={isOpen} onClose={handleClose}>
        <MenuItem onClick={showMembers}>
          <MembersIcon color="primary" />
          {t('chat:menu.showMembers')}
        </MenuItem>
        {!chat.isDirect && (
          <MenuItem onClick={addMembers}>
            <UserPlusIcon color="primary" />
            {t('chat:menu.addMembers')}
          </MenuItem>
        )}
        {!chat.isDirect && (
          <MenuItem onClick={renameChat}>
            <EditIcon color="primary" />
            {t('chat:menu.renameChat')}
          </MenuItem>
        )}
        <MenuItem onClick={cleanChat}>
          <BroomIcon color="primary" />
          {t('chat:menu.cleanChat')}
        </MenuItem>
        {!chat.isDirect && (
          <MenuItem onClick={leaveChat}>
            <LeaveIcon color="primary" />
            {t('chat:menu.leaveChat')}
          </MenuItem>
        )}
        {!chat.isDirect && (
          <MenuItem onClick={deleteChat}>
            <DeleteIcon color="error" />
            {t('chat:menu.deleteChat')}
          </MenuItem>
        )}
      </PopupMenu>
    </>
  );
};

export default ChatContentActions;
