import React, {FC, useEffect, useMemo, useState} from 'react';
import {chatContentStyles} from './_styles';
import {Box} from '@material-ui/core';
import {Chat} from '../../../models/chat.model';
import {User} from '../../../models/user.model';
import {useUserListContext} from '../../../shared/contexts/list-contexts/user-list-context';
import ChatContentHeader from './chat-content-header';
import MessageContentList from './chat-content-list';
import ChatContentFooter from './chat-content-footer';
import {Message} from '../../../models/message.model';
import {ChatUtils} from '../../../shared/utils/chat.utils';

type Props = {
  chat: Chat;
  closeChat: () => void;
  account: User;
};

const ChatContent: FC<Props> = ({chat, closeChat, account}: Props) => {
  const classes = chatContentStyles();
  const {users, handleUserIds} = useUserListContext();
  const [messages, setMessages] = useState<Message[]>([]);

  const title = useMemo<string>(() => (chat ? ChatUtils.getTitle(chat, users, account) : null), [chat, users, account]);

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
          <ChatContentHeader chat={chat} title={title} closeChat={closeChat} clearMessages={clearMessages} />
          <MessageContentList chat={chat} account={account} messages={messages} setMessages={setMessages} />
          <ChatContentFooter chatId={chat.id} />
        </>
      )}
      {!chat && <Box className={classes.placeholder} />}
    </Box>
  );
};

export default ChatContent;
