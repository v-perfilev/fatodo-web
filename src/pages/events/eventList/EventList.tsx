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
import {DEFAULT_MARGIN, PAGE_HEADER_HEIGHT} from '../../../constants';
import PageDivider from '../../../components/layouts/PageDivider';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import ConditionalSpinner from '../../../components/layouts/ConditionalSpinner';
import EventListSkeleton from '../skeletons/EventListSkeleton';

type EventListProps = {
  toggleCollapsed?: () => void;
};

const EventList = ({toggleCollapsed}: EventListProps) => {
  const dispatch = useAppDispatch();
  const events = useAppSelector(EventsSelectors.events);
  const allLoaded = useAppSelector(EventsSelectors.allLoaded);
  const [loading, setLoading] = useDelayedState(!events.length);
  const [hideScrollButton, setHideScrollButton] = useState<boolean>(true);
  const listMethodsRef = useRef<VirtualizedListMethods>();
  const listRef = useRef<HTMLDivElement>();

  /*
  loaders
   */

  const load = useCallback(async (): Promise<void> => {
    await dispatch(EventsActions.fetchEventsThunk(events.length));
  }, [events.length]);

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

  const scrollUp = (): void => listMethodsRef.current.scrollToTop();

  /*
  effects
   */

  useEffect(() => {
    if (loading) {
      load().finally(() => setLoading(false));
      refreshUnread().finally();
    }
  }, []);

  return (
    <>
      <EventListHeader width={listRef.current?.clientWidth} toggleCollapsed={toggleCollapsed} />
      <ConditionalSpinner loading={loading} loadingPlaceholder={<EventListSkeleton />}>
        <VirtualizedList
          itemRenderer={itemRenderer}
          keyExtractor={keyExtractor}
          itemData={events}
          allLoaded={allLoaded}
          loadMoreItems={load}
          paddingTop={PAGE_HEADER_HEIGHT + DEFAULT_MARGIN}
          paddingBottom={DEFAULT_MARGIN}
          setIsOnTop={setHideScrollButton}
          virtualizedListMethodsRef={listMethodsRef}
          virtualizedListRef={listRef}
        />
        <ScrollCornerButton show={!hideScrollButton} action={scrollUp} />
      </ConditionalSpinner>
    </>
  );
};

export default EventList;
