import React, {memo} from 'react';
import ChatSkeleton from './ChatSkeleton';
import FVStack from '../../../components/boxes/FVStack';
import {SxProps} from '@mui/material';
import {CHAT_SKELETON_HEIGHT, DEFAULT_MARGIN, HEADER_HEIGHT, PAGE_HEADER_HEIGHT} from '../../../constants';
import PageContent from '../../../components/layouts/PageContent';

const ChatListSkeleton = () => {
  const height = window.innerHeight - HEADER_HEIGHT - PAGE_HEADER_HEIGHT - DEFAULT_MARGIN;
  const count = Math.floor(height / CHAT_SKELETON_HEIGHT);
  const indexArray = Array.from(Array(count).keys());

  return (
    <FVStack sx={containerStyles} spacing={0}>
      {indexArray.map((index) => (
        <PageContent key={index}>
          <ChatSkeleton />
        </PageContent>
      ))}
    </FVStack>
  );
};

const containerStyles: SxProps = {
  marginTop: PAGE_HEADER_HEIGHT + DEFAULT_MARGIN + 'px',
};

export default memo(ChatListSkeleton);
