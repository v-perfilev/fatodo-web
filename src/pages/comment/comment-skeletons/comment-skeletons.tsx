import React, {FC, useMemo} from 'react';
import CommentSkeleton from './comment-skeleton';
import {COMMENT_SKELETONS_COUNT} from '../_constants';

const CommentSkeletons: FC = () => {
  const indexArray = useMemo(() => Array.from(Array(COMMENT_SKELETONS_COUNT).keys()), []);

  return (
    <>
      {indexArray.map((index) => (
        <CommentSkeleton key={index} />
      ))}
    </>
  );
};

export default CommentSkeletons;
