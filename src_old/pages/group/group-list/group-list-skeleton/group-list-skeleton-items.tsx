import React, {FC, useMemo} from 'react';
import {CARD_ITEMS_COUNT} from '../../_constants';
import GroupListSkeletonItem from './group-list-skeleton-item';
import GroupListSkeletonsInfo from './group-list-skeleton-info';

const GroupListSkeletonItems: FC = () => {
  const indexArray = useMemo(() => Array.from(Array(CARD_ITEMS_COUNT).keys()), []);

  return (
    <>
      {indexArray.map((index) => (
        <GroupListSkeletonItem key={index} />
      ))}
      <GroupListSkeletonsInfo />
    </>
  );
};

export default GroupListSkeletonItems;
