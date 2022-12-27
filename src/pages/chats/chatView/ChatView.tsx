import React, {useState} from 'react';
import ChatViewHeader from './ChatViewHeader';
import ChatViewFooter from './ChatViewFooter';
import ChatViewContent from './ChatViewContent';
import {useAppSelector} from '../../../store/store';
import ChatSelectors from '../../../store/chat/chatSelectors';
import ConditionalSpinner from '../../../components/layouts/ConditionalSpinner';
import ChatViewSkeleton from '../skeletons/ChatViewSkeleton';

const ChatView = () => {
  const loading = useAppSelector(ChatSelectors.loading);
  const [width, setWidth] = useState<number>();

  return (
    <ConditionalSpinner loading={loading} loadingPlaceholder={<ChatViewSkeleton />}>
      <ChatViewHeader width={width} />
      <ChatViewContent setWidth={setWidth} />
      <ChatViewFooter width={width} />
    </ConditionalSpinner>
  );
};

export default ChatView;
