import React, {memo} from 'react';
import {
  COMMENT_SKELETON_HEIGHT,
  DEFAULT_MARGIN,
  HEADER_HEIGHT,
  PAGE_FOOTER_HEIGHT,
  PAGE_HEADER_HEIGHT,
} from '../../../constants';
import FVStack from '../../../components/boxes/FVStack';
import PageContent from '../../../components/layouts/PageContent';
import {SxProps} from '@mui/material';
import CommentSkeleton from './CommentSkeleton';

const CommentListSkeleton = () => {
  const height = window.innerHeight - HEADER_HEIGHT - PAGE_HEADER_HEIGHT - PAGE_FOOTER_HEIGHT - DEFAULT_MARGIN * 2;
  const count = Math.floor(height / COMMENT_SKELETON_HEIGHT);
  const indexArray = Array.from(Array(count).keys());

  return (
    <FVStack sx={containerStyles} spacing={0}>
      {indexArray.map((index) => (
        <PageContent maxWidth="md" key={index}>
          <CommentSkeleton />
        </PageContent>
      ))}
    </FVStack>
  );
};

const containerStyles: SxProps = {
  marginTop: PAGE_HEADER_HEIGHT + DEFAULT_MARGIN + 'px',
  marginBottom: PAGE_FOOTER_HEIGHT + DEFAULT_MARGIN + 'px',
};

export default memo(CommentListSkeleton);
