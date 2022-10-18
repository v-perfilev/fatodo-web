import React, {memo} from 'react';
import GroupItemSkeleton from './GroupItemSkeleton';
import GroupListCardInfoSkeleton from './GroupListCardInfoSkeleton';
import FVStack from '../../../../components/boxes/FVStack';
import {Box, Divider} from '@mui/material';

const GroupListCardSkeleton = () => {
  // TODO calculate count
  const indexArray = Array.from(Array(5).keys());

  return (
    <FVStack>
      {indexArray.map((index) => (
        <Box key={index}>
          {index !== 0 && <Divider />}
          <GroupItemSkeleton />
        </Box>
      ))}
      <GroupListCardInfoSkeleton />
    </FVStack>
  );
};

export default memo(GroupListCardSkeleton);
