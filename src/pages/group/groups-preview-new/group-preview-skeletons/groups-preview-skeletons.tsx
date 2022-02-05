import React, {FC, useMemo} from 'react';
import {CARD_ITEMS_COUNT} from '../../_constants';
import GroupsPreviewSkeletonsItem from './groups-preview-skeletons-item';

const GroupsPreviewSkeletons: FC = () => {
  const indexArray = useMemo(() => Array.from(Array(CARD_ITEMS_COUNT).keys()), []);

  return (
    <>
      {indexArray.map((index) => (
        <GroupsPreviewSkeletonsItem key={index} />
      ))}
    </>
  );
};

export default GroupsPreviewSkeletons;
