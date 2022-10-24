import React from 'react';
import {UserAccount} from '../../../../models/User';
import {Message} from '../../../../models/Message';
import ChatListMessageOutcoming from './ChatListMessageOutcoming';
import ChatListMessageIncoming from './ChatListMessageIncoming';
import ChatListMessageEvent from './ChatListMessageEvent';

type ChatListMessageProps = {
  message: Message;
  account: UserAccount;
};

const ChatListMessage = ({message, account}: ChatListMessageProps) => {
  const isMessageOutcoming = message && !message.isEvent && message.userId === account.id;
  const isMessageIncoming = message && !message.isEvent && message.userId !== account.id;
  const isMessageEvent = message && message && message.isEvent;

  return (
    <>
      {isMessageOutcoming && <ChatListMessageOutcoming message={message} />}
      {isMessageIncoming && <ChatListMessageIncoming message={message} />}
      {isMessageEvent && <ChatListMessageEvent message={message} />}
    </>
  );
};

export default ChatListMessage;
