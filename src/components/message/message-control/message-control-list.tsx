import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {messageControlListStyles} from './_styles';
import MessageControlChat from './message-control-chat';

const MessageControlList: FC = () => {
  const classes = messageControlListStyles();

  const array = Array.from({length: 50}, (_, i) => i);

  const chats = array.map((value) => {
    const message = {
      chatId: `chat_id_${value}`,
      userId: 'test',
      text: `message_${value}`,
      forwardedMessage: null,
      isEvent: false,
      createdAt: new Date().getTime() + '',
      statuses: [],
      reactions: []
    };
    return {
      id: `chat_id_${value}`,
      title: `test_${value}`,
      isDirect: false,
      members: [],
      lastMessage: message
    };
  });

  return (
    <Box className={classes.root}>
      {chats.map((chat, index) => (
        <MessageControlChat key={index} chat={chat} />
      ))}
    </Box>
  );
};

export default MessageControlList;
