import React from 'React';
import {Box, SxProps} from '@mui/material';
import {EVENTS_HEADER_HEIGHT} from '../../../constants';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import EventsSelectors from '../../../store/events/eventsSelectors';
import {useCallback, useEffect, useRef, useState} from 'react';
import {EventsActions} from '../../../store/events/eventsActions';
import {Event} from '../../../models/Event';
import PageContent from '../../../components/layouts/PageContent';
import VirtualizedList, {
  VirtualizedListMethods,
} from '../../../components/layouts/lists/virtualizedList/VirtualizedList';
import ScrollCornerButton from '../../../components/surfaces/ScrollCornerButton';
import EventListItem from './eventListItem/EventListItem';

const EventListContent = () => {
  const dispatch = useAppDispatch();
  const events = useAppSelector(EventsSelectors.events);
  const unreadCount = useAppSelector(EventsSelectors.unreadCount);
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
    (event: Event) => (
      <PageContent disableGutters>
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
  }, []);

  return (
    <Box sx={listStyles}>
      <VirtualizedList
        itemRenderer={itemRenderer}
        keyExtractor={keyExtractor}
        itemData={events}
        allLoaded={allLoaded}
        loadMoreItems={load}
        paddingTop={8}
        paddingBottom={8}
        setIsOnTop={setHideScrollButton}
        virtualizedListRef={listRef}
      />
      <ScrollCornerButton show={!hideScrollButton} action={scrollUp} />
    </Box>
  );
};

const listStyles: SxProps = {
  width: '100%',
  height: `calc(100% - ${EVENTS_HEADER_HEIGHT}px)`,
};

export default EventListContent;
