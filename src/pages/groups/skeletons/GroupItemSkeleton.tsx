import React, {memo} from 'react';
import {Skeleton, SxProps} from '@mui/material';
import FBox from '../../../components/boxes/FBox';
import FHStack from '../../../components/boxes/FHStack';
import FVStack from '../../../components/boxes/FVStack';
import {ITEM_SKELETON_HEIGHT} from '../../../constants';

const GroupItemSkeleton = () => {
  return (
    <FBox sx={containerStyles}>
      <FHStack spacing={2} alignItems="center">
        <Skeleton variant="rounded" width="30px" height="30px" />
        <FBox flexGrow={1}>
          <Skeleton variant="rounded" width="150px" height="24px" />
        </FBox>
        <FVStack spacing={2} alignItems="flex-end">
          <Skeleton variant="rounded" width="50px" height="15px" />
          <FHStack>
            <Skeleton variant="rounded" width="20px" height="20px" />
            <Skeleton variant="rounded" width="35px" height="20px" />
            <Skeleton variant="rounded" width="35px" height="20px" />
          </FHStack>
        </FVStack>
      </FHStack>
    </FBox>
  );
};

const containerStyles: SxProps = {
  width: '100%',
  height: ITEM_SKELETON_HEIGHT,
  alignItems: 'center',
};

export default memo(GroupItemSkeleton);
