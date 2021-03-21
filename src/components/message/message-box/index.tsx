import React, {FC, HTMLAttributes, memo} from 'react';
import {Message} from '../../../models/message.model';
import MessageBoxOutcoming from './message-box-outcoming';
import MessageBoxIncoming from './message-box-incoming';
import {compose} from 'recompose';
import {User} from '../../../models/user.model';
import {Container} from '@material-ui/core';
import {useUserListContext} from '../../../shared/contexts/list-contexts/user-list-context';

type Props = HTMLAttributes<HTMLElement> & {
  message: Message;
  account: User;
};

const MessageBox: FC<Props> = ({message, account, style}: Props) => {
  const {users} = useUserListContext();

  const user = users.find((user) => user.id === message.userId);

  const isMessageOutcoming = message.userId === account.id;

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
