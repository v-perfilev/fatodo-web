import React, {memo} from 'react';
import {Skeleton, SxProps} from '@mui/material';
import {CONTACT_SKELETON_HEIGHT} from '../../../constants';
import FHStack from '../../../components/boxes/FHStack';

const ContactSkeleton = () => {
  return (
    <FHStack sx={containerStyles} spacing={1} alignItems="flex-end">
      <Skeleton variant="circular" width={40} height={40} />
      <Skeleton variant="rectangular" width={150} height={18} />
      <FHStack spacing={1} justifyContent="flex-end">
        <Skeleton variant="circular" width={30} height={30} />
        <Skeleton variant="circular" width={30} height={30} />
      </FHStack>
    </FHStack>
  );
};

const containerStyles: SxProps = {
  width: '100%',
  height: CONTACT_SKELETON_HEIGHT,
  alignItems: 'center',
};

export default memo(ContactSkeleton);
