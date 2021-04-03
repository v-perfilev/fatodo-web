import React, {FC, HTMLAttributes, memo, useEffect} from 'react';
import {Message} from '../../../../models/message.model';
import ChatContentMessageOutcoming from './chat-content-message-outcoming';
import ChatContentMessageIncoming from './chat-content-message-incoming';
import {User} from '../../../../models/user.model';
import {Box, Container} from '@material-ui/core';
import MessageContentBoxEvent from './chat-content-message-event';
import {useUserListContext} from '../../../../shared/contexts/list-contexts/user-list-context';
import {chatContentMessageStyles} from './_styles';

type Props = HTMLAttributes<HTMLElement> & {
  index: number;
  messages: Message[];
  account: User;
  isVisible: boolean;
};

const ChatContentMessage: FC<Props> = ({index, messages, account, isVisible, style}: Props) => {
  const classes = chatContentMessageStyles();
  const {handleUserIds} = useUserListContext();

  const message = messages[index];
  const isMessageOutcoming = !message.isEvent && message.userId === account.id;
  const isMessageIncoming = !message.isEvent && message.userId !== account.id;
  const isMessageEvent = message.isEvent;

  const isFirst = index === 0;

  useEffect(() => {
    handleUserIds([message.userId]);
  }, []);

  return (
    <div style={style}>
      {isFirst && <Box className={classes.spacer} />}
      <Container maxWidth="md">
        {isMessageOutcoming && <ChatContentMessageOutcoming message={message} />}
        {isMessageIncoming && <ChatContentMessageIncoming message={message} account={account} isVisible={isVisible} />}
        {isMessageEvent && <MessageContentBoxEvent message={message} />}
      </Container>
    </div>
  );
};

export default memo(ChatContentMessage);
