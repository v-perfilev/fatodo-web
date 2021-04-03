import React, {FC, useEffect} from 'react';
import {chatContentStyles} from './_styles';
import {Box} from '@material-ui/core';
import {Chat} from '../../../models/chat.model';
import {User} from '../../../models/user.model';
import {useUserListContext} from '../../../shared/contexts/list-contexts/user-list-context';
import ChatContentHeader from './chat-content-header';
import MessageContentList from './chat-content-list';
import ChatContentFooter from './chat-content-footer';

type Props = {
  chat: Chat;
  account: User;
};

const ChatContent: FC<Props> = ({chat, account}: Props) => {
  const classes = chatContentStyles();
  const {handleUserIds} = useUserListContext();

  useEffect(() => {
    handleUserIds(chat?.members);
  }, [chat]);

  return (
    <Box className={classes.root}>
      {chat && (
        <>
          <ChatContentHeader chat={chat} account={account} />
          <MessageContentList chat={chat} account={account} />
          <ChatContentFooter chatId={chat.id} />
        </>
      )}
      {!chat && (
        <Box className={classes.placeholder} />
      )}
    </Box>
  );
};

export default ChatContent;
