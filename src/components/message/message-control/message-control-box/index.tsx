import React, {FC, HTMLAttributes, memo} from 'react';
import {Message} from '../../../../models/message.model';
import MessageControlBoxOutcoming from './message-control-box-outcoming';
import MessageControlBoxIncoming from './message-control-box-incoming';
import {compose} from 'recompose';
import {User} from '../../../../models/user.model';
import MessageControlBoxEvent from './message-control-box-event';

type Props = HTMLAttributes<HTMLElement> & {
  message: Message;
  account: User;
};

const MessageControlBox: FC<Props> = ({message, account, style}: Props) => {

  const isMessageOutcoming = !message.isEvent && message.userId === account.id;
  const isMessageIncoming = !message.isEvent && message.userId !== account.id;
  const isMessageEvent = message.isEvent;

  return (
    <div style={style}>
      {isMessageOutcoming && <MessageControlBoxOutcoming message={message} />}
      {isMessageIncoming && <MessageControlBoxIncoming message={message} />}
      {isMessageEvent && <MessageControlBoxEvent message={message} />}
    </div>
  );
};

export default compose(memo)(MessageControlBox);
