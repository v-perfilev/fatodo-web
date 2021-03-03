import React, {FC, memo, useState} from 'react';
import {messageControlStyles} from './_styles';
import MessageControlHeader from './message-control-header';
import {Box} from '@material-ui/core';
import MessageControlFilteredList from './message-control-filtered-list';
import MessageControlList from './message-control-list';
import {compose} from 'recompose';
import {Chat} from '../../../models/chat.model';

type Props = {
  setChat: (chat: Chat) => void;
}

const MessageControl: FC<Props> = ({setChat}: Props) => {
  const classes = messageControlStyles();
  const [filter, setFilter] = useState<string>('');

  const showFiltered = filter.trim().length > 0;

  return (
    <Box className={classes.root}>
      <MessageControlHeader setFilter={setFilter} />
      {!showFiltered && <MessageControlList setChat={setChat} />}
      {showFiltered && <MessageControlFilteredList />}
    </Box>
  );
};

export default compose(memo)(MessageControl);
