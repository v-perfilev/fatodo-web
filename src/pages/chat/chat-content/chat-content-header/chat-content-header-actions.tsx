import React, {FC, MouseEvent, useRef, useState} from 'react';
import {Box, IconButton, Theme, useMediaQuery} from '@material-ui/core';
import {chatContentHeaderActionsStyles} from './_styles';
import {Chat} from '../../../../models/chat.model';
import {DotsVerticalIcon} from '../../../../components/icons/dots-vertical-icon';
import {PopupMenu} from '../../../../components/surfaces';
import {useTranslation} from 'react-i18next';
import {DeleteIcon} from '../../../../components/icons/delete-icon';
import {BroomIcon} from '../../../../components/icons/broom-icon';
import {LeaveIcon} from '../../../../components/icons/leave-icon';
import {MembersIcon} from '../../../../components/icons/members-icon';
import {UserPlusIcon} from '../../../../components/icons/user-plus-icon';
import ChatService from '../../../../services/chat.service';
import {useSnackContext} from '../../../../shared/contexts/snack-context';
import {EditIcon} from '../../../../components/icons/edit-icon';
import {useUserListContext} from '../../../../shared/contexts/list-contexts/user-list-context';
import {useChatDialogContext} from '../../../../shared/contexts/dialog-contexts/chat-dialog-context';
import {MessageIcon} from '../../../../components/icons/message-icon';
import {PopupMenuItem, PopupMenuItemProps} from '../../../../components/surfaces';

type Props = {
  chat: Chat;
  title: string;
  closeChat: () => void;
  clearMessages: () => void;
};

const ChatContentHeaderActions: FC<Props> = ({chat, title, closeChat, clearMessages}: Props) => {
  const classes = chatContentHeaderActionsStyles();
  const {users} = useUserListContext();
  const {handleResponse} = useSnackContext();
  const {t} = useTranslation();
  const ref = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const {showChatAddMembersDialog, showChatMembersDialog, showChatRenameDialog} = useChatDialogContext();
  const isBigDevice = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'), {noSsr: true});

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

  const menuItems = [
    {action: closeChat, icon: <MessageIcon color="primary" />, text: t('chat:menu.toChatList'), show: !isBigDevice},
    {action: showMembers, icon: <MembersIcon color="primary" />, text: t('chat:menu.showMembers')},
    {action: addMembers, icon: <UserPlusIcon color="primary" />, text: t('chat:menu.addMembers'), show: !chat.isDirect},
    {action: renameChat, icon: <EditIcon color="primary" />, text: t('chat:menu.renameChat'), show: !chat.isDirect},
    {action: cleanChat, icon: <BroomIcon color="primary" />, text: t('chat:menu.cleanChat')},
    {action: leaveChat, icon: <LeaveIcon color="primary" />, text: t('chat:menu.leaveChat'), show: !chat.isDirect},
    {action: deleteChat, icon: <DeleteIcon color="error" />, text: t('chat:menu.deleteChat'), show: !chat.isDirect},
  ] as PopupMenuItemProps[];

  return (
    <>
      <IconButton onClick={handleClickOnAction} ref={ref}>
        <DotsVerticalIcon />
      </IconButton>
      <PopupMenu className={classes.popupMenu} anchorEl={ref?.current} open={isOpen} onClose={handleClose}>
        <Box>
          {menuItems.map((item, index) => (
            <PopupMenuItem action={item.action} icon={item.icon} text={item.text} show={item.show} key={index} />
          ))}
        </Box>
      </PopupMenu>
    </>
  );
};

export default ChatContentHeaderActions;
