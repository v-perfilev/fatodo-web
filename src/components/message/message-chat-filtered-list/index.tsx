import React, {FC, ReactNode} from 'react';
import {Box} from '@material-ui/core';
import {messageChatFilteredListStyles} from './_styles';


const MessageChatFilteredList: FC = () => {
  const classes = messageChatFilteredListStyles();

  const renderNumbers = (): ReactNode => {
    const a = Array.from({length: 1000}, (_, i) => 1000 - i);
    return (
      <>
        {a.map((value, index) => <div key={index}>{value}</div>)}
      </>
    );
  };

  return (
    <Box className={classes.root}>
      {renderNumbers()}
    </Box>
  );
};

export default MessageChatFilteredList;
