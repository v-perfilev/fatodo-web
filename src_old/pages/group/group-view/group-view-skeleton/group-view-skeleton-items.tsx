import React, {FC, useMemo} from 'react';
import {GROUP_ITEMS_COUNT} from '../../_constants';
import GroupViewSkeletonItem from './group-view-skeleton-item';

const GroupViewSkeletonItems: FC = () => {
  const indexArray = useMemo(() => Array.from(Array(GROUP_ITEMS_COUNT).keys()), []);

  return (
    <>
      {indexArray.map((index) => (
        <GroupViewSkeletonItem key={index} />
      ))}
    </>
  );
};

export default GroupViewSkeletonItems;
