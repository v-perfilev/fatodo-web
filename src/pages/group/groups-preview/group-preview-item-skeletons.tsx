import React, {FC, useMemo} from 'react';
import {CARD_ITEMS_COUNT} from '../_constants';
import GroupPreviewItemSkeleton from './group-preview-item-skeleton';

const GroupPreviewItemSkeletons: FC = () => {
  const indexArray = useMemo(() => Array.from(Array(CARD_ITEMS_COUNT).keys()), []);

  return (
    <>
      {indexArray.map((index) => (
        <GroupPreviewItemSkeleton key={index} />
      ))}
    </>
  );
};

export default GroupPreviewItemSkeletons;
