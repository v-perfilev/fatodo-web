import React, {FC, HTMLAttributes} from 'react';
import {Box, Container} from '@material-ui/core';
import {chatContentItemStyles} from './_styles';
import {MessageListItem} from '../../../../models/message.model';
import ChatContentMessage from '../chat-content-message';
import ChatContentDate from './chat-content-date';

type Props = HTMLAttributes<HTMLElement> & {
  item: MessageListItem;
  isVisible: boolean;
  isFirst: boolean;
};

const ChatContentItem: FC<Props> = ({item, isVisible, isFirst, style}: Props) => {
  const classes = chatContentItemStyles();

  const date = item.date;
  const message = item.message;

  return (
    <div style={style}>
      <Container maxWidth="md">
        {isFirst && <Box className={classes.spacer} />}
        {date && <ChatContentDate date={date} />}
        {message && <ChatContentMessage message={message} isVisible={isVisible} />}
      </Container>
    </div>
  );
};

export default ChatContentItem;
