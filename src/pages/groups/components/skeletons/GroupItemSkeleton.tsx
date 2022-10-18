import React, {memo} from 'react';
import {Skeleton} from '@mui/material';
import FBox from '../../../../components/boxes/FBox';
import FHStack from '../../../../components/boxes/FHStack';
import FVStack from '../../../../components/boxes/FVStack';

const GroupItemSkeleton = () => {
  return (
    <FVStack height={118} px={4} py={5} spacing={4}>
      <FHStack>
        <FBox>
          <Skeleton variant="rounded" width="90%" height="16px" />
        </FBox>
        <FBox flex="0">
          <Skeleton variant="circular" width="25px" height="25px" />
        </FBox>
      </FHStack>
      <Skeleton variant="rounded" width="150px" height="12px" />
      <FHStack justifyContent="space-between">
        <Skeleton variant="rounded" width="200px" height="14px" />
        <Skeleton variant="rounded" width="50px" height="20px" />
      </FHStack>
    </FVStack>
  );
};

export default memo(GroupItemSkeleton);
