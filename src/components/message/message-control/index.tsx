import React, {FC, memo, useState} from 'react';
import {messageControlStyles} from './_styles';
import MessageControlHeader from './message-control-header';
import {Box} from '@material-ui/core';
import MessageControlFilteredList from './message-control-filtered-list';
import MessageControlList from './message-control-list';
import {compose} from 'recompose';
import {Chat} from '../../../models/chat.model';
import MessageControlLoader from './message-control-loader';

type Props = {
  chat: Chat;
  setChat: (chat: Chat) => void;
}

const MessageControl: FC<Props> = ({chat, setChat}: Props) => {
  const classes = messageControlStyles();
  const [filter, setFilter] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const showFiltered = filter.trim().length > 0;

  return (
    <Box className={classes.root}>
      <MessageControlHeader setFilter={setFilter} />
      {!loading && !showFiltered && <MessageControlList chat={chat} setChat={setChat} />}
      {!loading && showFiltered && <MessageControlFilteredList />}
      {loading && <MessageControlLoader />}
    </Box>
  );
};

export default compose(memo)(MessageControl);
