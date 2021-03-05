import React, {FC, useState} from 'react';
import {Box} from '@material-ui/core';
import {messageContentFooterStyles} from './_styles';
import MessageContentInput from './message-content-input';
import MessageContentSendButton from './message-content-send-button';

const MessageContentFooter: FC = () => {
  const classes = messageContentFooterStyles();
  const [message, setMessage] = useState<string>('');

  const send = (): void => {
    console.log(message);
  };

  return (
    <Box className={classes.root}>
      <MessageContentInput send={send} setMessage={setMessage} />
      <MessageContentSendButton send={send} />
    </Box>
  );

};

export default MessageContentFooter;
