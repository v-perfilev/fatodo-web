import React, {FC, useMemo} from 'react';
import {GROUP_ITEMS_COUNT} from '../_constants';
import GroupViewItemSkeleton from './group-view-item-skeleton';

const GroupViewItemSkeletons: FC = () => {
  const indexArray = useMemo(() => Array.from(Array(GROUP_ITEMS_COUNT).keys()), []);

  return (
    <>
      {indexArray.map((index) => (
        <GroupViewItemSkeleton key={index} />
      ))}
    </>
  );
};

export default GroupViewItemSkeletons;
