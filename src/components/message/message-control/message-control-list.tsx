import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {messageControlListStyles} from './_styles';
import MessageControlChat from './message-control-chat';

const MessageControlList: FC = () => {
  const classes = messageControlListStyles();

  const array = Array.from({length: 1000}, (_, i) => i);


  return (
    <Box className={classes.root}>
      {array.map((value, index) => (
        <MessageControlChat key={index} n={value} />
      ))}
    </Box>
  );
};

export default MessageControlList;
