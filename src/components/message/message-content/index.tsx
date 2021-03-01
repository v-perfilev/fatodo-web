import React, {FC} from 'react';
import {messageContentStyles} from './_styles';
import {Box} from '@material-ui/core';
import MessageContentHeader from './message-content-header';
import MessageContentList from './message-content-list';

type Props = {
  chatId: string;
}

const MessageContent: FC<Props> = ({chatId}: Props) => {
  const classes = messageContentStyles();

  return (
    <Box className={classes.root}>
      <MessageContentHeader />
      <MessageContentList />
    </Box>
  );
};

export default MessageContent;
