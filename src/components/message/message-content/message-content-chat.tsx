import React, {FC} from 'react';
import MessageContentHeader from './message-content-header';
import MessageContentList from './message-content-list';
import MessageContentFooter from './message-content-footer';
import {Chat} from '../../../models/chat.model';
import {User} from '../../../models/user.model';

type Props = {
  chat: Chat;
  account: User;
};

const MessageContentChat: FC<Props> = ({chat, account}: Props) => {

  return (
    <>
      <MessageContentHeader chat={chat} />
      <MessageContentList chat={chat} account={account} />
      <MessageContentFooter chatId={chat.id} />
    </>
  );
};

export default MessageContentChat;
