import React, {FC} from 'react';
import MessageContentHeader from './message-content-header';
import MessageContentList from './message-content-list';
import MessageContentFooter from './message-content-footer';
import {Chat} from '../../../models/chat.model';

type Props = {
  chat: Chat;
};

const MessageContentChat: FC<Props> = ({chat}: Props) => {



  return (
    <>
      <MessageContentHeader chat={chat} />
      <MessageContentList chat={chat} />
      <MessageContentFooter />
    </>
  );
};

export default MessageContentChat;
