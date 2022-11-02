import React from 'react';
import ChatViewHeader from './ChatViewHeader';
import ChatViewFooter from './ChatViewFooter';
import ChatViewContent from './ChatViewContent';
import {useAppSelector} from '../../../store/store';
import ChatSelectors from '../../../store/chat/chatSelectors';
import ConditionalSpinner from '../../../components/layouts/ConditionalSpinner';
import ChatViewSkeleton from '../skeletons/ChatViewSkeleton';

const ChatView = () => {
  const loading = useAppSelector(ChatSelectors.loading);

  return (
    <ConditionalSpinner loading={loading} loadingPlaceholder={<ChatViewSkeleton />}>
      <ChatViewHeader />
      <ChatViewContent />
      <ChatViewFooter />
    </ConditionalSpinner>
  );
};

export default ChatView;
