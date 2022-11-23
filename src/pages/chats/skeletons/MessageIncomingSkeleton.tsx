import React, {memo} from 'react';
import {Box, Skeleton, SxProps} from '@mui/material';
import {MESSAGE_SKELETON_HEIGHT} from '../../../constants';
import FVStack from '../../../components/boxes/FVStack';
import FHStack from '../../../components/boxes/FHStack';
import FBox from '../../../components/boxes/FBox';

const MessageIncomingSkeleton = () => {
  return (
    <FBox sx={containerStyles}>
      <FHStack spacing={1} alignItems="flex-start">
        <Box marginTop={1}>
          <Skeleton variant="circular" width={40} height={40} />
        </Box>
        <FVStack sx={messageStyles} spacing={3} alignItems="stretch" justifyContent="center">
          <FHStack justifyContent="space-between">
            <Skeleton variant="rounded" width={100} height={18} />
            <Skeleton variant="rounded" width={50} height={18} />
          </FHStack>
          <Skeleton variant="rounded" width="70%" height={15} />
        </FVStack>
      </FHStack>
    </FBox>
  );
};

const containerStyles: SxProps = {
  width: '80%',
  height: MESSAGE_SKELETON_HEIGHT,
  marginRight: '20%',
  alignItems: 'center',
};

const messageStyles: SxProps = {
  paddingX: 2,
  paddingY: 2,
  backgroundColor: 'grey.50',
  borderRadius: 3,
};

export default memo(MessageIncomingSkeleton);
