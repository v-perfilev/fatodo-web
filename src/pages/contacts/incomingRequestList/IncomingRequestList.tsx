import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ContactsSelectors from '../../../store/contacts/contactsSelectors';
import {ContactsActions} from '../../../store/contacts/contactsActions';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import {ContactRequest} from '../../../models/Contact';
import IncomingRequestListItem from './IncomingRequestListItem';
import VirtualizedList, {VirtualizedListMethods} from '../../../components/layouts/lists/VirtualizedList';
import ScrollCornerButton from '../../../components/surfaces/ScrollCornerButton';
import ConditionalSpinner from '../../../components/layouts/ConditionalSpinner';
import {ListChildComponentProps} from 'react-window';
import PageContent from '../../../components/layouts/PageContent';

const IncomingRequestList = () => {
  const dispatch = useAppDispatch();
  const incomingRequests = useAppSelector(ContactsSelectors.incomingRequests);
  const [loading, setLoading] = useDelayedState(!incomingRequests.length);
  const [hideScrollButton, setHideScrollButton] = useState<boolean>(true);
  const listRef = useRef<VirtualizedListMethods>();

  const refresh = useCallback(async (): Promise<void> => {
    await dispatch(ContactsActions.fetchIncomingRequestsThunk());
  }, []);

  /*
  keyExtractor and renderItem
   */

  const keyExtractor = useCallback(
    (index: number): string => {
      return incomingRequests.length > 0 ? incomingRequests[index].id : undefined;
    },
    [incomingRequests],
  );

  const itemRenderer = useCallback(
    ({data, index}: ListChildComponentProps<ContactRequest[]>) => (
      <PageContent>
        <IncomingRequestListItem request={data[index]} />
      </PageContent>
    ),
    [],
  );

  /*
  scroll up button
   */

  const scrollUp = (): void => listRef.current.scrollToTop();

  /*
  Effects
   */

  useEffect(() => {
    loading && !incomingRequests.length && refresh().finally(() => setLoading(false));
  }, []);

  return (
    <ConditionalSpinner loading={loading}>
      <VirtualizedList
        itemRenderer={itemRenderer}
        keyExtractor={keyExtractor}
        data={incomingRequests}
        dataCount={incomingRequests.length}
        setIsOnTop={setHideScrollButton}
        virtualizedListRef={listRef}
      />
      <ScrollCornerButton show={!hideScrollButton} action={scrollUp} />
    </ConditionalSpinner>
  );
};

export default memo(IncomingRequestList);
