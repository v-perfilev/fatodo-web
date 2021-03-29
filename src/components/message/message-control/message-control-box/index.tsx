import React, {FC, HTMLAttributes, useEffect} from 'react';
import {Message} from '../../../../models/message.model';
import MessageControlBoxOutcoming from './message-control-box-outcoming';
import MessageControlBoxIncoming from './message-control-box-incoming';
import {User} from '../../../../models/user.model';
import MessageControlBoxEvent from './message-control-box-event';
import {useUserListContext} from '../../../../shared/contexts/list-contexts/user-list-context';

type Props = HTMLAttributes<HTMLElement> & {
  message: Message;
  account: User;
};

const MessageControlBox: FC<Props> = ({message, account, style}: Props) => {
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
      {isMessageOutcoming && <MessageControlBoxOutcoming message={message} />}
      {isMessageIncoming && <MessageControlBoxIncoming message={message} />}
      {isMessageEvent && <MessageControlBoxEvent message={message} />}
    </div>
  );
};

export default MessageControlBox;
