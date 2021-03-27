import React, {FC, HTMLAttributes, memo} from 'react';
import {Message} from '../../../models/message.model';
import MessageBoxOutcoming from './message-box-outcoming';
import MessageBoxIncoming from './message-box-incoming';
import {compose} from 'recompose';
import {User} from '../../../models/user.model';
import {Container} from '@material-ui/core';
import MessageBoxEvent from './message-box-event';

type Props = HTMLAttributes<HTMLElement> & {
  message: Message;
  account: User;
};

const MessageBox: FC<Props> = ({message, account, style}: Props) => {

  const isMessageOutcoming = !message.isEvent && message.userId === account.id;
  const isMessageIncoming = !message.isEvent && message.userId !== account.id;
  const isMessageEvent = message.isEvent;

  return (
    <div style={style}>
      <Container maxWidth="md">
        {isMessageOutcoming && <MessageBoxOutcoming message={message} />}
        {isMessageIncoming && <MessageBoxIncoming message={message} />}
        {isMessageEvent && <MessageBoxEvent message={message} />}
      </Container>
    </div>
  );
};

export default compose(memo)(MessageBox);
