import React, {FC, HTMLAttributes, memo} from 'react';
import {Message} from '../../../models/message.model';
import MessageBoxOutcoming from './message-box-outcoming';
import MessageBoxIncoming from './message-box-incoming';
import {compose} from 'recompose';
import {User} from '../../../models/user.model';
import {Container} from '@material-ui/core';

type Props = HTMLAttributes<HTMLElement> & {
  message: Message,
  account: User,
}

const MessageBox: FC<Props> = ({message, account, style}: Props) => {
  const isMessageOutcoming = message.userId === account.id;

  const user = {
    id: 'test',
    username: 'test',
    firstname: 'test',
    lastname: 'test',
    imageFilename: 'test'
  };

  return (
    <div style={style}>
      <Container maxWidth="sm">
        {isMessageOutcoming && <MessageBoxOutcoming message={message} user={user} />}
        {!isMessageOutcoming && <MessageBoxIncoming message={message} user={user} />}
      </Container>
    </div>
  );
};

export default compose(memo)(MessageBox);
