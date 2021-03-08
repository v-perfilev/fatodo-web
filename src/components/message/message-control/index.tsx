import React, {FC, useState} from 'react';
import {messageControlStyles} from './_styles';
import MessageControlHeader from './message-control-header';
import {Box} from '@material-ui/core';
import MessageControlFilteredList from './message-control-filtered-list';
import MessageControlList from './message-control-list';
import {Chat} from '../../../models/chat.model';

type Props = {
  chat: Chat;
  setChat: (chat: Chat) => void;
}

const MessageControl: FC<Props> = ({chat, setChat}: Props) => {
  const classes = messageControlStyles();
  const [filter, setFilter] = useState<string>('');

  const showFiltered = filter.trim().length > 0;

  return (
    <Box className={classes.root}>
      <MessageControlHeader setFilter={setFilter} />
      {!showFiltered && <MessageControlList chat={chat} setChat={setChat} />}
      {showFiltered && <MessageControlFilteredList chat={chat} setChat={setChat} />}
    </Box>
  );
};

export default MessageControl;
