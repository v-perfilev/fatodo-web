import React, {FC, useState} from 'react';
import {messageControlStyles} from './_styles';
import MessageControlHeader from './message-control-header';
import {Box} from '@material-ui/core';
import MessageControlFilteredList from './message-control-filtered-list';
import MessageControlList from './message-control-list';


const MessageControl: FC = () => {
  const classes = messageControlStyles();
  const [filter, setFilter] = useState<string>('');

  const showFiltered = filter.trim().length > 0;

  return (
    <Box className={classes.root}>
      <MessageControlHeader setFilter={setFilter} />
      {!showFiltered && <MessageControlList />}
      {showFiltered && <MessageControlFilteredList />}
    </Box>
  );
};

export default MessageControl;
