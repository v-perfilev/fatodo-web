import React, {FC, useEffect} from 'react';
import MessageContentHeader from './message-content-header';
import MessageContentList from './message-content-list';
import MessageContentFooter from './message-content-footer';
import {Chat} from '../../../models/chat.model';
import {User} from '../../../models/user.model';
import {useUserListContext} from '../../../shared/contexts/list-contexts/user-list-context';

type Props = {
  chat: Chat;
  account: User;
};

const MessageContentChat: FC<Props> = ({chat, account}: Props) => {
  const {handleUserIds} = useUserListContext();

  useEffect(() => {
    handleUserIds(chat.members);
  }, [chat]);

  return (
    <>
      <MessageContentHeader chat={chat} account={account} />
      <MessageContentList chat={chat} account={account} />
      <MessageContentFooter chatId={chat.id} />
    </>
  );
};

export default MessageContentChat;
