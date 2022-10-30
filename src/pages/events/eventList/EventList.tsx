import React, {useCallback, useEffect, useRef, useState} from 'react';
import EventListHeader from './EventListHeader';
import VirtualizedList, {
  VirtualizedListMethods,
} from '../../../components/layouts/lists/virtualizedList/VirtualizedList';
import ScrollCornerButton from '../../../components/surfaces/ScrollCornerButton';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import EventsSelectors from '../../../store/events/eventsSelectors';
import {EventsActions} from '../../../store/events/eventsActions';
import {Event} from '../../../models/Event';
import PageContent from '../../../components/layouts/PageContent';
import EventListItem from './eventListItem/EventListItem';
import {PAGE_HEADER_HEIGHT} from '../../../constants';
import PageDivider from '../../../components/layouts/PageDivider';

type EventListProps = {
  toggleCollapsed?: () => void;
};

const EventList = ({toggleCollapsed}: EventListProps) => {
  const dispatch = useAppDispatch();
  const events = useAppSelector(EventsSelectors.events);
  const allLoaded = useAppSelector(EventsSelectors.allLoaded);
  const [hideScrollButton, setHideScrollButton] = useState<boolean>(true);
  const listRef = useRef<VirtualizedListMethods>();

  /*
  loaders
   */

  const load = useCallback(async (): Promise<void> => {
    await dispatch(EventsActions.fetchEventsThunk(events.length));
  }, [events.length]);

  const refresh = useCallback(async (): Promise<void> => {
    await dispatch(EventsActions.refreshEventsThunk());
  }, []);

  const refreshUnread = useCallback(async (): Promise<void> => {
    await dispatch(EventsActions.refreshUnreadCountThunk());
  }, []);

  /*
  keyExtractor and renderItem
   */

  const keyExtractor = useCallback(
    (index: number): string => {
      return events[index].id || `${events[index].type}${events[index].date}`;
    },
    [events],
  );

  const itemRenderer = useCallback(
    (event: Event, index: number) => (
      <PageContent maxWidth="md">
        {index !== 0 && <PageDivider />}
        <EventListItem event={event} />
      </PageContent>
    ),
    [],
  );

  /*
  scroll up button
   */

  const scrollUp = (): void => listRef.current.scrollToTop();

  /*
  effects
   */

  useEffect(() => {
    load().finally();
    refreshUnread().finally();
  }, []);

  return (
    <>
      <EventListHeader toggleCollapsed={toggleCollapsed} />
      <VirtualizedList
        itemRenderer={itemRenderer}
        keyExtractor={keyExtractor}
        itemData={events}
        allLoaded={allLoaded}
        loadMoreItems={load}
        paddingTop={PAGE_HEADER_HEIGHT + 8}
        paddingBottom={8}
        setIsOnTop={setHideScrollButton}
        virtualizedListRef={listRef}
      />
      <ScrollCornerButton show={!hideScrollButton} action={scrollUp} />
    </>
  );
};

export default EventList;
