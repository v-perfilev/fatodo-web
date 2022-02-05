import React, {FC, useMemo} from 'react';
import {CARD_ITEMS_COUNT} from '../../_constants';
import GroupListSkeletonsItem from './group-list-skeletons-item';
import GroupListSkeletonsInfo from './group-list-skeletons-info';

const GroupListSkeletons: FC = () => {
  const indexArray = useMemo(() => Array.from(Array(CARD_ITEMS_COUNT).keys()), []);

  return (
    <>
      {indexArray.map((index) => (
        <GroupListSkeletonsItem key={index} />
      ))}
      <GroupListSkeletonsInfo />
    </>
  );
};

export default GroupListSkeletons;
