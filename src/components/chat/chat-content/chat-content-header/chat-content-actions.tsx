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
import {ChatDialogs} from '../../_router';
import {ChatMembersDialogProps} from '../../dialogs/chat-members-dialog';
import {ChatAddMembersDialogProps} from '../../dialogs/chat-add-members-dialog';
import {useDialogsContext} from '../../../../shared/contexts/dialogs-context';
import {useUserListContext} from '../../../../shared/contexts/list-contexts/user-list-context';
import {ChatRenameDialogProps} from '../../dialogs/chat-rename-dialog';

type Props = {
  chat: Chat;
  title: string;
  closeChat: () => void;
  clearMessages: () => void;
};

const ChatContentActions: FC<Props> = ({chat, title, closeChat, clearMessages}: Props) => {
  const classes = chatContentHeaderActionsStyles();
  const {users} = useUserListContext();
  const {setDialogProps, clearDialogProps} = useDialogsContext();
  const {handleResponse} = useSnackContext();
  const {t} = useTranslation();
  const ref = useRef();
  const [isOpen, setIsOpen] = useState(false);

  const showChatAddMembersDialog = (): void => {
    const close = (): void => clearDialogProps(ChatDialogs.ADD_MEMBERS);
    const props = {chat, close} as ChatAddMembersDialogProps;
    setDialogProps(ChatDialogs.ADD_MEMBERS, props);
  };

  const showChatMembersDialog = (): void => {
    const close = (): void => clearDialogProps(ChatDialogs.MEMBERS);
    const switchToAddMembers = (): void => {
      clearDialogProps(ChatDialogs.MEMBERS);
      showChatAddMembersDialog();
    };
    const props = {chat, users, close, switchToAddMembers} as ChatMembersDialogProps;
    setDialogProps(ChatDialogs.MEMBERS, props);
  };

  const showChatRenameDialog = (): void => {
    const close = (): void => clearDialogProps(ChatDialogs.RENAME);
    const props = {chat, title, close} as ChatRenameDialogProps;
    setDialogProps(ChatDialogs.RENAME, props);
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
    showChatMembersDialog();
    handleClose(e);
  };

  const addMembers = (e: MouseEvent<HTMLElement>): void => {
    showChatAddMembersDialog();
    handleClose(e);
  };

  const renameChat = (e: MouseEvent<HTMLElement>): void => {
    showChatRenameDialog();
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
