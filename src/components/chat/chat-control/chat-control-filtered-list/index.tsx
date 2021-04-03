import React, {FC, ReactNode} from 'react';
import {Box} from '@material-ui/core';
import {chatControlFilteredListStyles} from './_styles';
import {Chat} from '../../../../models/chat.model';

type Props = {
  chat: Chat;
  setChat: (chat: Chat) => void;
};

const ChatControlFilteredList: FC<Props> = () => {
  const classes = chatControlFilteredListStyles();

  const renderNumbers = (): ReactNode => {
    const a = Array.from({length: 1000}, (_, i) => 1000 - i);
    return (
      <>
        {a.map((value, index) => (
          <div key={index}>{value}</div>
        ))}
      </>
    );
  };

  return <Box className={classes.root}>{renderNumbers()}</Box>;
};

export default ChatControlFilteredList;
