import React, {memo} from 'react';
import MessageIncomingSkeleton from './MessageIncomingSkeleton';
import MessageOutcomingSkeleton from './MessageOutcomingSkeleton';
import {
  DEFAULT_MARGIN,
  HEADER_HEIGHT,
  MESSAGE_SKELETON_HEIGHT,
  PAGE_FOOTER_HEIGHT,
  PAGE_HEADER_HEIGHT,
} from '../../../constants';
import FVStack from '../../../components/boxes/FVStack';
import PageContent from '../../../components/layouts/PageContent';
import PageHeader from '../../../components/layouts/PageHeader';
import PageFooter from '../../../components/layouts/PageFooter';
import {Skeleton} from '@mui/material';
import FHStack from '../../../components/boxes/FHStack';

const ChatViewSkeleton = () => {
  const height = window.innerHeight - HEADER_HEIGHT - PAGE_HEADER_HEIGHT - PAGE_FOOTER_HEIGHT - 2 * DEFAULT_MARGIN;
  const count = Math.floor(height / (MESSAGE_SKELETON_HEIGHT * 2));
  const indexArray = Array.from(Array(count).keys());

  return (
    <FVStack spacing={0}>
      <PageHeader>
        <FHStack justifyContent="space-between">
          <Skeleton variant="rectangular" width={200} height={18} />
          <Skeleton variant="rectangular" width={50} height={18} />
        </FHStack>
      </PageHeader>
      <FVStack marginY={1} spacing={0}>
        {indexArray.map((index) => (
          <PageContent maxWidth="md" key={index}>
            <MessageIncomingSkeleton />
            <MessageOutcomingSkeleton />
          </PageContent>
        ))}
      </FVStack>
      <PageFooter>
        <Skeleton variant="rectangular" width="30%" height={18} />
      </PageFooter>
    </FVStack>
  );
};

export default memo(ChatViewSkeleton);
