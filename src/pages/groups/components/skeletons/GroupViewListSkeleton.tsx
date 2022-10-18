import React, {memo} from 'react';
import FVStack from '../../../../components/boxes/FVStack';
import {Box, Divider} from '@mui/material';
import GroupItemSkeleton from './GroupItemSkeleton';

const GroupListCardSkeleton = () => {
  // TODO calculate count
  // const height = Dimensions.get('window').height;
  // const count = Math.round(height / ITEM_SKELETONS_HEIGHT);
  const indexArray = Array.from(Array(5).keys());

  return (
    <FVStack>
      {indexArray.map((index) => (
        <Box key={index}>
          {index !== 0 && <Divider />}
          <GroupItemSkeleton />
        </Box>
      ))}
    </FVStack>
  );
};

export default memo(GroupListCardSkeleton);
