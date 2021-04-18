import React, {FC, useEffect, useMemo, useState} from 'react';
import {chatContentStyles} from './_styles';
import {Box} from '@material-ui/core';
import {Chat} from '../../../models/chat.model';
import {User} from '../../../models/user.model';
import {useUserListContext} from '../../../shared/contexts/list-contexts/user-list-context';
import ChatContentHeader from './chat-content-header';
import MessageContentList from './chat-content-list';
import ChatContentFooter from './chat-content-footer';
import ChatMembersDialog from '../dialogs/chat-members-dialog';
import ChatAddMembersDialog from '../dialogs/chat-add-members-dialog';
import {Message} from '../../../models/message.model';
import ChatRenameDialog from '../dialogs/chat-rename-dialog';
import {ChatUtils} from '../../../shared/utils/chat.utils';

type Props = {
  chat: Chat;
  closeChat: () => void;
  account: User;
};

export type ChatContentDialogType = 'rename' | 'members' | 'add-members' | 'none';

const ChatContent: FC<Props> = ({chat, closeChat, account}: Props) => {
  const classes = chatContentStyles();
  const {users, handleUserIds} = useUserListContext();
  const [dialog, setDialog] = useState<ChatContentDialogType>('none');
  const [messages, setMessages] = useState<Message[]>([]);

  const title = useMemo<string>(() => (chat ? ChatUtils.getTitle(chat, users, account) : null), [chat, users, account]);

  const isRenameDialogOpened = dialog === 'rename';
  const isMembersDialogOpened = dialog === 'members';
  const isAddMembersDialogOpened = dialog === 'add-members';

  const openRenameDialog = (): void => {
    setDialog('rename');
  };

  const openMembersDialog = (): void => {
    setDialog('members');
  };

  const openAddMembersDialog = (): void => {
    setDialog('add-members');
  };

  const closeDialog = (): void => {
    setDialog('none');
  };

  const clearMessages = (): void => {
    setMessages([]);
  };

  useEffect(() => {
    handleUserIds(chat?.members);
  }, [chat]);

  return (
    <Box className={classes.root}>
      {chat && (
        <>
          <ChatContentHeader
            chat={chat}
            title={title}
            openMembersDialog={openMembersDialog}
            openAddMembersDialog={openAddMembersDialog}
            openRenameDialog={openRenameDialog}
            closeChat={closeChat}
            clearMessages={clearMessages}
          />
          <MessageContentList chat={chat} account={account} messages={messages} setMessages={setMessages} />
          <ChatContentFooter chatId={chat.id} />

          <ChatMembersDialog
            chat={chat}
            isOpen={isMembersDialogOpened}
            close={closeDialog}
            switchToAddMembers={openAddMembersDialog}
          />
          <ChatAddMembersDialog chat={chat} isOpen={isAddMembersDialogOpened} close={closeDialog} />
          <ChatRenameDialog chat={chat} isOpen={isRenameDialogOpened} close={closeDialog} title={title} />
        </>
      )}
      {!chat && <Box className={classes.placeholder} />}
    </Box>
  );
};

export default ChatContent;
