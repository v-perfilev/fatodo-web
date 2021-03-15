import React, {FC, useEffect} from 'react';
import {messageContentStyles} from './_styles';
import {Box} from '@material-ui/core';
import MessageContentChat from './message-content-chat';
import MessageContentPlaceholder from './message-content-placeholder';
import {Chat} from '../../../models/chat.model';
import {User} from '../../../models/user.model';
import {useUserListContext} from '../../../shared/contexts/list-contexts/user-list-context';

type Props = {
  chat: Chat;
  account: User;
}

const MessageContent: FC<Props> = ({chat, account}: Props) => {
  const classes = messageContentStyles();

  return (
    <Box className={classes.root}>
      {chat && <MessageContentChat chat={chat} account={account} />}
      {!chat && <MessageContentPlaceholder />}
    </Box>
  );
};

export default MessageContent;
