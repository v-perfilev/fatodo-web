import React, {FC, HTMLAttributes, useEffect} from 'react';
import {Message} from '../../../../models/message.model';
import MessageContentBoxOutcoming from './message-content-box-outcoming';
import MessageContentBoxIncoming from './message-content-box-incoming';
import {User} from '../../../../models/user.model';
import {Container} from '@material-ui/core';
import MessageContentBoxEvent from './message-content-box-event';
import {useUserListContext} from '../../../../shared/contexts/list-contexts/user-list-context';

type Props = HTMLAttributes<HTMLElement> & {
  message: Message;
  account: User;
  isVisible: boolean;
};

const MessageContentBox: FC<Props> = ({message, account, isVisible, style}: Props) => {
  const {handleUserIds} = useUserListContext();

  const isMessageOutcoming = !message.isEvent && message.userId === account.id;
  const isMessageIncoming = !message.isEvent && message.userId !== account.id;
  const isMessageEvent = message.isEvent;

  useEffect(() => {
    handleUserIds([message.userId]);
  }, []);

  return (
    <div style={style}>
      <Container maxWidth="md">
        {isMessageOutcoming && <MessageContentBoxOutcoming message={message} />}
        {isMessageIncoming && <MessageContentBoxIncoming message={message} account={account} isVisible={isVisible} />}
        {isMessageEvent && <MessageContentBoxEvent message={message} />}
      </Container>
    </div>
  );
};

export default MessageContentBox;
