import React, {memo} from 'react';
import FVStack from '../../../components/boxes/FVStack';
import {Divider, Skeleton} from '@mui/material';
import GroupItemSkeleton from './GroupItemSkeleton';
import PageContent from '../../../components/layouts/PageContent';
import {DEFAULT_MARGIN, HEADER_HEIGHT, ITEM_SKELETON_HEIGHT, PAGE_HEADER_HEIGHT} from '../../../constants';
import PageHeader from '../../../components/layouts/PageHeader';
import FHStack from '../../../components/boxes/FHStack';

const GroupListCardSkeleton = () => {
  const height = window.innerHeight - HEADER_HEIGHT - PAGE_HEADER_HEIGHT + DEFAULT_MARGIN;
  const count = Math.floor(height / ITEM_SKELETON_HEIGHT);
  const indexArray = Array.from(Array(count).keys());

  return (
    <FVStack>
      <PageHeader maxWidth="md">
        <FHStack justifyContent="space-between">
          <Skeleton variant="rectangular" width={200} height={18} />
          <Skeleton variant="rectangular" width={50} height={18} />
        </FHStack>
      </PageHeader>
      <FVStack spacing={0}>
        {indexArray.map((index) => (
          <PageContent maxWidth="md" key={index}>
            {index !== 0 && <Divider />}
            <GroupItemSkeleton />
          </PageContent>
        ))}
      </FVStack>
    </FVStack>
  );
};

export default memo(GroupListCardSkeleton);
