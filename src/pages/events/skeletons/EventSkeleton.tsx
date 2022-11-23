import React, {memo} from 'react';
import FHStack from '../../../components/boxes/FHStack';
import {Skeleton, SxProps} from '@mui/material';
import {EVENT_SKELETON_HEIGHT} from '../../../constants';
import FVStack from '../../../components/boxes/FVStack';
import PaperBox from '../../../components/boxes/PaperBox';
import FBox from '../../../components/boxes/FBox';

const EventSkeleton = () => {
  return (
    <FBox sx={containerStyles}>
      <FHStack spacing={1} alignItems="flex-start">
        <Skeleton variant="circular" width={40} height={40} />
        <FVStack spacing={1.5} alignItems="stretch" justifyContent="center">
          <FHStack>
            <Skeleton variant="rounded" width={150} height={18} />
            <FHStack justifyContent="flex-end">
              <Skeleton variant="rounded" width={60} height={15} />
            </FHStack>
          </FHStack>
          <Skeleton variant="rounded" width="80%" height={15} />
          <PaperBox sx={paperStyles} elevation={0}>
            <Skeleton variant="rounded" width="60%" height={15} />
          </PaperBox>
        </FVStack>
      </FHStack>
    </FBox>
  );
};

const containerStyles: SxProps = {
  width: '100%',
  height: EVENT_SKELETON_HEIGHT,
  alignItems: 'center',
};

const paperStyles: SxProps = {
  paddingY: 1,
  paddingX: 2,
  borderRadius: 3,
  backgroundColor: 'grey.50',
};

export default memo(EventSkeleton);
