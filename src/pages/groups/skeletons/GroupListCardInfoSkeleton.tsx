import React, {memo} from 'react';
import FHStack from '../../../components/boxes/FHStack';
import {Skeleton, SxProps} from '@mui/material';
import {GROUP_INFO_SKELETON_HEIGHT} from '../../../constants';

const GroupListCardInfoSkeleton = () => {
  return (
    <FHStack sx={containerStyles} justifyContent="space-between">
      <Skeleton variant="rounded" width="30px" height="30px" />
      <Skeleton variant="rounded" width="100px" height="12px" />
      <Skeleton variant="rounded" width="50px" height="22px" />
    </FHStack>
  );
};

const containerStyles: SxProps = {
  width: '100%',
  height: GROUP_INFO_SKELETON_HEIGHT,
  alignItems: 'center',
};

export default memo(GroupListCardInfoSkeleton);
