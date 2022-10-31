import React, {memo} from 'react';
import {Skeleton, SxProps} from '@mui/material';
import FBox from '../../../components/boxes/FBox';
import FHStack from '../../../components/boxes/FHStack';
import FVStack from '../../../components/boxes/FVStack';
import {ITEM_SKELETON_HEIGHT} from '../../../constants';

const GroupItemSkeleton = () => {
  return (
    <FBox sx={containerStyles}>
      <FVStack>
        <FHStack justifyContent="space-between">
          <Skeleton variant="rounded" width="60%" height="16px" />
          <Skeleton variant="circular" width="25px" height="25px" />
        </FHStack>
        <Skeleton variant="rounded" width="150px" height="12px" />
        <FHStack justifyContent="space-between">
          <Skeleton variant="rounded" width="200px" height="14px" />
          <Skeleton variant="rounded" width="80px" height="20px" />
        </FHStack>
      </FVStack>
    </FBox>
  );
};

const containerStyles: SxProps = {
  width: '100%',
  height: ITEM_SKELETON_HEIGHT,
  alignItems: 'center',
};

export default memo(GroupItemSkeleton);
