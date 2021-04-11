import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {chatContentHeaderStyles} from './_styles';
import {Chat} from '../../../../models/chat.model';
import ChatContentActions from './chat-content-actions';
import {ChatUtils} from '../../../../shared/utils/chat.utils';
import {User} from '../../../../models/user.model';
import {useUserListContext} from '../../../../shared/contexts/list-contexts/user-list-context';
import ChatContentMembers from '../chat-content-members';

type Props = {
  chat: Chat;
  account: User;
};

const ChatContentHeader: FC<Props> = ({chat, account}: Props) => {
  const classes = chatContentHeaderStyles();
  const {users} = useUserListContext();

  const title = ChatUtils.getTitle(chat, users, account);

  return (
    <Box className={classes.root}>
      <Box className={classes.title}>{title}</Box>
      <ChatContentMembers chat={chat} />
      <ChatContentActions chat={chat} />
    </Box>
  );
};

export default ChatContentHeader;
