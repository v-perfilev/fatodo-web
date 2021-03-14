import React, {FC, useEffect, useState} from 'react';
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

type ControlType = 'list' | 'filtered';

const MessageControl: FC<Props> = ({chat, setChat}: Props) => {
  const classes = messageControlStyles();
  const [type, setType] = useState<ControlType>('list');
  const [filter, setFilter] = useState<string>('');

  useEffect(() => {
    const showFiltered = filter.trim().length > 0;
    setType(showFiltered ? 'filtered' : 'list');
  }, [filter]);

  return (
    <Box className={classes.root}>
      <MessageControlHeader setFilter={setFilter} />
      {type === 'list' && <MessageControlList chat={chat} setChat={setChat} />}
      {type === 'filtered' && <MessageControlFilteredList chat={chat} setChat={setChat} />}
    </Box>
  );
};

export default MessageControl;
