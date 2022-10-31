import React, {memo} from 'react';
import {Box, Skeleton, SxProps} from '@mui/material';
import {COMMENT_SKELETON_HEIGHT} from '../../../constants';
import FBox from '../../../components/boxes/FBox';
import FVStack from '../../../components/boxes/FVStack';
import FHStack from '../../../components/boxes/FHStack';

const CommentSkeleton = () => {
  return (
    <FBox sx={containerStyles}>
      <FHStack spacing={1} alignItems="flex-start">
        <Box marginTop={1}>
          <Skeleton variant="circular" width={40} height={40} />
        </Box>
        <FVStack sx={messageStyles} spacing={2} alignItems="stretch" justifyContent="center">
          <FHStack justifyContent="space-between">
            <Skeleton variant="rectangular" width={100} height={18} />
            <Skeleton variant="rectangular" width={50} height={18} />
          </FHStack>
          <Skeleton variant="rectangular" width="70%" height={15} />
        </FVStack>
      </FHStack>
    </FBox>
  );
};

const containerStyles: SxProps = {
  width: '100%',
  height: COMMENT_SKELETON_HEIGHT,
  alignItems: 'center',
};

const messageStyles: SxProps = {
  paddingX: 2,
  paddingY: 2.5,
  backgroundColor: 'grey.50',
  borderRadius: 3,
};

export default memo(CommentSkeleton);
