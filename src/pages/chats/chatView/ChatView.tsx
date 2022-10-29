import React from 'React';
import ChatViewHeader from './ChatViewHeader';
import ChatViewFooter from './ChatViewFooter';
import ChatViewContent from './ChatViewContent';
import {useAppSelector} from '../../../store/store';
import ChatSelectors from '../../../store/chat/chatSelectors';
import ConditionalSpinner from '../../../components/layouts/ConditionalSpinner';
import {Box} from '@mui/material';

const ChatView = () => {
  const chatId = useAppSelector(ChatSelectors.chatId);
  const chat = useAppSelector(ChatSelectors.chat);

  const loading = !!chatId && !chat;

  return (
    <ConditionalSpinner loading={loading}>
      {chat ? (
        <>
          <ChatViewHeader />
          <ChatViewContent />
          <ChatViewFooter />
        </>
      ) : (
        <Box />
      )}
    </ConditionalSpinner>
  );
};

export default ChatView;
