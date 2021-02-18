import React, {FC, ReactNode} from 'react';
import {messageControlStyles} from './_styles';
import MessageChatFilter from '../message-chat-filter';
import {Box} from '@material-ui/core';


const MessageControl: FC = () => {
  const classes = messageControlStyles();

  const renderNumbers = (): ReactNode => {
    const a = Array.from({length: 1000}, (_, i) => i);
    return (
      <>
        {a.map((value, index) => <div key={index}>{value}</div>)}
      </>
    );
  };

  return (
    <Box className={classes.root}>
      <MessageChatFilter />
      {renderNumbers()}
    </Box>
  );
};

export default MessageControl;
