import React, {memo} from 'react';
import GroupItemSkeleton from './GroupItemSkeleton';
import GroupListCardInfoSkeleton from './GroupListCardInfoSkeleton';
import FVStack from '../../../components/boxes/FVStack';
import {Divider} from '@mui/material';
import PageContent from '../../../components/layouts/PageContent';

const GroupListCardSkeleton = () => {
  const indexArray = Array.from(Array(5).keys());

  return (
    <FVStack spacing={0}>
      {indexArray.map((index) => (
        <PageContent key={index}>
          {index !== 0 && <Divider />}
          <GroupItemSkeleton />
        </PageContent>
      ))}
      <GroupListCardInfoSkeleton />
    </FVStack>
  );
};

export default memo(GroupListCardSkeleton);
