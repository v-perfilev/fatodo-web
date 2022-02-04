import React, {FC, useMemo} from 'react';
import {CARD_ITEMS_COUNT} from '../_constants';
import GroupsPreviewItemSkeletonsItem from './groups-preview-item-skeletons-item';

const GroupsPreviewItemSkeletons: FC = () => {
  const indexArray = useMemo(() => Array.from(Array(CARD_ITEMS_COUNT).keys()), []);

  return (
    <>
      {indexArray.map((index) => (
        <GroupsPreviewItemSkeletonsItem key={index} />
      ))}
    </>
  );
};

export default GroupsPreviewItemSkeletons;
