import React from 'React';
import {Box} from '@mui/material';
import {UserAccount} from '../../../models/User';
import {Chat} from '../../../models/Chat';

type ChatViewProps = {
  chat: Chat;
  closeChat: () => void;
  account: UserAccount;
};

const ChatView = ({chat, closeChat, account}: ChatViewProps) => {
  return <Box>Chat view</Box>;
};

export default ChatView;
