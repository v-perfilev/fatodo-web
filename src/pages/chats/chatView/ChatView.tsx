import React from 'React';
import ChatViewHeader from './ChatViewHeader';
import ChatViewFooter from './ChatViewFooter';
import ChatViewContent from './ChatViewContent';
import {useAppSelector} from '../../../store/store';
import ChatSelectors from '../../../store/chat/chatSelectors';

const ChatView = () => {
  const chat = useAppSelector(ChatSelectors.chat);

  return chat ? (
    <>
      <ChatViewHeader />
      <ChatViewContent />
      <ChatViewFooter />
    </>
  ) : null;
};

export default ChatView;
