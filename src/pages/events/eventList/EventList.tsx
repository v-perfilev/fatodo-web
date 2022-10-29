import React from 'react';
import EventListHeader from './EventListHeader';
import EventListContent from './EventListContent';

type EventListProps = {
  toggleCollapsed?: () => void;
};

const EventList = ({toggleCollapsed}: EventListProps) => {
  return (
    <>
      <EventListHeader toggleCollapsed={toggleCollapsed} />
      <EventListContent />
    </>
  );
};

export default EventList;
