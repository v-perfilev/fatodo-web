import React, {FC, useMemo} from 'react';
import {CARD_ITEMS_COUNT} from '../../_constants';
import GroupListSkeletonsItem from './group-list-skeletons-item';

const GroupListSkeletons: FC = () => {
  const indexArray = useMemo(() => Array.from(Array(CARD_ITEMS_COUNT).keys()), []);

  return (
    <>
      {indexArray.map((index) => (
        <GroupListSkeletonsItem key={index} />
      ))}
    </>
  );
};

export default GroupListSkeletons;
