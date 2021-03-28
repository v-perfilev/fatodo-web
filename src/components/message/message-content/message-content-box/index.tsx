import React, {FC, HTMLAttributes, memo} from 'react';
import {Message} from '../../../../models/message.model';
import MessageContentBoxOutcoming from './message-content-box-outcoming';
import MessageContentBoxIncoming from './message-content-box-incoming';
import {compose} from 'recompose';
import {User} from '../../../../models/user.model';
import {Container} from '@material-ui/core';
import MessageContentBoxEvent from './message-content-box-event';

type Props = HTMLAttributes<HTMLElement> & {
  message: Message;
  account: User;
};

const MessageContentBox: FC<Props> = ({message, account, style}: Props) => {

  const isMessageOutcoming = !message.isEvent && message.userId === account.id;
  const isMessageIncoming = !message.isEvent && message.userId !== account.id;
  const isMessageEvent = message.isEvent;

  return (
    <div style={style}>
      <Container maxWidth="md">
        {isMessageOutcoming && <MessageContentBoxOutcoming message={message} />}
        {isMessageIncoming && <MessageContentBoxIncoming message={message} />}
        {isMessageEvent && <MessageContentBoxEvent message={message} />}
      </Container>
    </div>
  );
};

export default compose(memo)(MessageContentBox);
