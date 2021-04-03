import React, {FC, HTMLAttributes, useEffect} from 'react';
import {Message} from '../../../../models/message.model';
import ChatControlMessageOutcoming from './chat-control-message-outcoming';
import ChatControlMessageIncoming from './chat-control-message-incoming';
import {User} from '../../../../models/user.model';
import ChatControlMessageEvent from './chat-control-message-event';
import {useUserListContext} from '../../../../shared/contexts/list-contexts/user-list-context';

type Props = HTMLAttributes<HTMLElement> & {
  message: Message;
  account: User;
};

const ChatControlMessage: FC<Props> = ({message, account, style}: Props) => {
  const {handleUserIds} = useUserListContext();

  const isMessageOutcoming = message && !message.isEvent && message.userId === account.id;
  const isMessageIncoming = message && !message.isEvent && message.userId !== account.id;
  const isMessageEvent = message && message && message.isEvent;

  useEffect(() => {
    if (message?.userId) {
      handleUserIds([message.userId]);
    }
  }, []);

  return (
    <div style={style}>
      {isMessageOutcoming && <ChatControlMessageOutcoming message={message} />}
      {isMessageIncoming && <ChatControlMessageIncoming message={message} />}
      {isMessageEvent && <ChatControlMessageEvent message={message} />}
    </div>
  );
};

export default ChatControlMessage;
