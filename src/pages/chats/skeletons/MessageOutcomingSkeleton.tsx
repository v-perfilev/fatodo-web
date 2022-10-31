import React, {memo} from 'react';
import {Skeleton, SxProps} from '@mui/material';
import {MESSAGE_SKELETON_HEIGHT} from '../../../constants';
import FVStack from '../../../components/boxes/FVStack';
import FHStack from '../../../components/boxes/FHStack';
import FBox from '../../../components/boxes/FBox';

const MessageOutcomingSkeleton = () => {
  return (
    <FBox sx={containerStyles}>
      <FVStack sx={messageStyles} spacing={3} alignItems="stretch" justifyContent="center">
        <FHStack justifyContent="space-between">
          <Skeleton variant="rectangular" width={100} height={18} />
          <Skeleton variant="rectangular" width={50} height={18} />
        </FHStack>
        <Skeleton variant="rectangular" width="70%" height={15} />
      </FVStack>
    </FBox>
  );
};

const containerStyles: SxProps = {
  width: '80%',
  height: MESSAGE_SKELETON_HEIGHT,
  marginLeft: '20%',
  alignItems: 'center',
};

const messageStyles: SxProps = {
  paddingX: 2,
  paddingY: 2,
  backgroundColor: 'grey.50',
  borderRadius: 3,
};

export default memo(MessageOutcomingSkeleton);
