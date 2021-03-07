import React, {FC, useState} from 'react';
import {messageContentStyles} from './_styles';
import {Box} from '@material-ui/core';
import MessageContentChat from './message-content-chat';
import MessageContentPlaceholder from './message-content-placeholder';
import {Chat} from '../../../models/chat.model';
import {User} from '../../../models/user.model';
import MessageContentLoader from './message-content-loader';

type Props = {
  chat: Chat;
  account: User;
}

const MessageContent: FC<Props> = ({chat, account}: Props) => {
  const classes = messageContentStyles();
  const [loading, setLoading] = useState(false);

  return (
    <Box className={classes.root}>
      {!loading && chat && <MessageContentChat chat={chat} account={account} />}
      {!loading && !chat && <MessageContentPlaceholder />}
      {loading && <MessageContentLoader />}
    </Box>
  );
};

export default MessageContent;
