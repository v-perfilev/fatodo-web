import React, {FC} from 'react';
import {messageContentStyles} from './_styles';
import {Box} from '@material-ui/core';
import MessageContentChat from './message-content-chat';
import MessageContentPlaceholder from './message-content-placeholder';
import {Chat} from '../../../models/chat.model';

type Props = {
  chat: Chat;
}

const MessageContent: FC<Props> = ({chat}: Props) => {
  const classes = messageContentStyles();

  return (
    <Box className={classes.root}>
      {chat && <MessageContentChat />}
      {!chat && <MessageContentPlaceholder />}
    </Box>
  );
};

export default MessageContent;
