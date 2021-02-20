import React, {FC, useState} from 'react';
import {messageControlStyles} from './_styles';
import MessageChatFilter from '../message-chat-filter';
import {Box} from '@material-ui/core';
import MessageChatFilteredList from '../message-chat-filtered-list';
import MessageChatList from '../message-chat-list';


const MessageControl: FC = () => {
  const classes = messageControlStyles();
  const [filter, setFilter] = useState<string>('');

  const showFiltered = filter.trim().length > 0;

  return (
    <Box className={classes.root}>
      <MessageChatFilter setFilter={setFilter} />
      {!showFiltered && <MessageChatList />}
      {showFiltered && <MessageChatFilteredList />}
    </Box>
  );
};

export default MessageControl;
