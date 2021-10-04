import React, {FC, useEffect, useMemo, useRef} from 'react';
import {chatContentStyles} from './_styles';
import {Box} from '@material-ui/core';
import {Chat} from '../../../models/chat.model';
import {User} from '../../../models/user.model';
import {useUserListContext} from '../../../shared/contexts/list-contexts/user-list-context';
import ChatContentHeader from './chat-content-header';
import ChatContentList, {ChatContentMethods} from './chat-content-list';
import ChatContentFooter from './chat-content-footer';
import {ChatUtils} from '../../../shared/utils/chat.utils';
import {Message} from '../../../models/message.model';
import ChatContentPlaceholder from './chat-content-placeholder';

type Props = {
  chat: Chat;
  closeChat: () => void;
  account: User;
};

const ChatContent: FC<Props> = ({chat, closeChat, account}: Props) => {
  const classes = chatContentStyles();
  const {users, handleUserIds} = useUserListContext();
  const chatContentListRef = useRef<ChatContentMethods>();

  const title = useMemo<string>(() => (chat ? ChatUtils.getTitle(chat, users, account) : null), [chat, users, account]);

  const clearMessages = (): void => {
    chatContentListRef.current?.clearMessages();
  };

  const addMessage = (message: Message): void => {
    chatContentListRef.current?.addMessage(message);
  };

  useEffect(() => {
    if (chat) {
      handleUserIds(chat.members);
    }
  }, [chat]);

  return (
    <Box className={classes.root}>
      {chat && (
        <>
          <ChatContentHeader chat={chat} title={title} closeChat={closeChat} clearMessages={clearMessages} />
          <ChatContentList chat={chat} account={account} chatContentListRef={chatContentListRef} />
          <ChatContentFooter chatId={chat.id} account={account} addMessage={addMessage} />
        </>
      )}
      {!chat && <ChatContentPlaceholder />}
    </Box>
  );
};

export default ChatContent;
