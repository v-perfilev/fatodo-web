import React, {memo} from 'react';
import FHStack from '../../../../components/boxes/FHStack';
import {Skeleton} from '@mui/material';

const GroupListCardInfoSkeleton = () => {
  return (
    <FHStack height="50px" p={4} justifyContent="space-between">
      <Skeleton variant="rounded" width="30px" height="30px" />
      <Skeleton variant="rounded" width="100px" height="12px" />
      <Skeleton variant="rounded" width="50px" height="22px" />
    </FHStack>
  );
};

export default memo(GroupListCardInfoSkeleton);
