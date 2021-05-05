import React, {FC, useEffect, useState} from 'react';
import {chatControlStyles} from './_styles';
import ChatControlHeader from './chat-control-header';
import {Box} from '@material-ui/core';
import ChatControlFilteredList from './chat-control-filtered-list';
import ChatControlList from './chat-control-list';
import {Chat} from '../../../models/chat.model';
import {User} from '../../../models/user.model';

type Props = {
  chat: Chat;
  setChat: (chat: Chat) => void;
  account: User;
};

type ControlType = 'list' | 'filtered';

const ChatControl: FC<Props> = ({chat, setChat, account}: Props) => {
  const classes = chatControlStyles();
  const [type, setType] = useState<ControlType>('list');
  const [filter, setFilter] = useState<string>('');

  useEffect(() => {
    const showFiltered = filter.trim().length > 0;
    setType(showFiltered ? 'filtered' : 'list');
  }, [filter]);

  return (
    <Box className={classes.root}>
      <ChatControlHeader setFilter={setFilter} />
      {type === 'list' && <ChatControlList chat={chat} setChat={setChat} account={account} />}
      {type === 'filtered' && (
        <ChatControlFilteredList filter={filter} chat={chat} setChat={setChat} account={account} />
      )}
    </Box>
  );
};
export default ChatControl;
