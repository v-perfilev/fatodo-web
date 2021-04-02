import React, {FC, HTMLAttributes, memo, useEffect} from 'react';
import {Message} from '../../../../models/message.model';
import MessageContentBoxOutcoming from './message-content-box-outcoming';
import MessageContentBoxIncoming from './message-content-box-incoming';
import {User} from '../../../../models/user.model';
import {Box, Container} from '@material-ui/core';
import MessageContentBoxEvent from './message-content-box-event';
import {useUserListContext} from '../../../../shared/contexts/list-contexts/user-list-context';
import {messageContentBoxStyles} from './_styles';

type Props = HTMLAttributes<HTMLElement> & {
  index: number;
  messages: Message[];
  account: User;
  isVisible: boolean;
};

const MessageContentBox: FC<Props> = ({index, messages, account, isVisible, style}: Props) => {
  const classes = messageContentBoxStyles();
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
        {isMessageOutcoming && <MessageContentBoxOutcoming message={message} />}
        {isMessageIncoming && <MessageContentBoxIncoming message={message} account={account} isVisible={isVisible} />}
        {isMessageEvent && <MessageContentBoxEvent message={message} />}
      </Container>
    </div>
  );
};

export default memo(MessageContentBox);
