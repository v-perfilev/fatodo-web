import React, {FC, useMemo} from 'react';
import CommentSkeletonsItem from './comment-skeletons-item';
import {COMMENT_SKELETONS_COUNT} from '../_constants';

const CommentSkeletons: FC = () => {
  const indexArray = useMemo(() => Array.from(Array(COMMENT_SKELETONS_COUNT).keys()), []);

  return (
    <>
      {indexArray.map((index) => (
        <CommentSkeletonsItem key={index} />
      ))}
    </>
  );
};

export default CommentSkeletons;
