import React, {memo} from 'react';
import EventSkeleton from './EventSkeleton';
import {DEFAULT_MARGIN, EVENT_SKELETON_HEIGHT, HEADER_HEIGHT, PAGE_HEADER_HEIGHT} from '../../../constants';
import PageContent from '../../../components/layouts/PageContent';
import PageDivider from '../../../components/layouts/PageDivider';
import FVStack from '../../../components/boxes/FVStack';
import {SxProps} from '@mui/material';

const EventListSkeleton = () => {
  const height = window.innerHeight - HEADER_HEIGHT - PAGE_HEADER_HEIGHT;
  const count = Math.floor(height / EVENT_SKELETON_HEIGHT);
  const indexArray = Array.from(Array(count).keys());

  return (
    <FVStack sx={containerStyles} spacing={0}>
      {indexArray.map((index) => (
        <PageContent maxWidth="md" key={index}>
          {index !== 0 && <PageDivider />}
          <EventSkeleton />
        </PageContent>
      ))}
    </FVStack>
  );
};

const containerStyles: SxProps = {
  marginTop: PAGE_HEADER_HEIGHT + DEFAULT_MARGIN / 2 + 'px',
};

export default memo(EventListSkeleton);
