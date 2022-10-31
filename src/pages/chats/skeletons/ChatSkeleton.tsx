import React, {memo} from 'react';
import FHStack from '../../../components/boxes/FHStack';
import {Skeleton, SxProps} from '@mui/material';
import FVStack from '../../../components/boxes/FVStack';
import {CHAT_SKELETON_HEIGHT} from '../../../constants';

const ChatSkeleton = () => {
  return (
    <FHStack sx={containerStyles} spacing={1}>
      <Skeleton variant="circular" width={40} height={40} />
      <FVStack spacing={1} alignItems="stretch" justifyContent="center">
        <FHStack spacing={1}>
          <Skeleton variant="rectangular" width={70} height={18} />
          <Skeleton variant="rectangular" width={30} height={18} />
          <FHStack justifyContent="flex-end">
            <Skeleton variant="rectangular" width={60} height={15} />
          </FHStack>
        </FHStack>
        <Skeleton variant="rectangular" width={200} height={15} />
      </FVStack>
    </FHStack>
  );
};

const containerStyles: SxProps = {
  width: '100%',
  height: CHAT_SKELETON_HEIGHT,
};

export default memo(ChatSkeleton);
