import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ContactsSelectors from '../../../store/contacts/contactsSelectors';
import {ContactsActions} from '../../../store/contacts/contactsActions';
import {ContactRequest} from '../../../models/Contact';
import {ListChildComponentProps} from 'react-window';
import VirtualizedList, {VirtualizedListMethods} from '../../../components/layouts/lists/VirtualizedList';
import ConditionalSpinner from '../../../components/layouts/ConditionalSpinner';
import ScrollCornerButton from '../../../components/surfaces/ScrollCornerButton';
import PageContent from '../../../components/layouts/PageContent';
import OutcomingRequestListItem from './OutcomingRequestListItem';

const OutcomingRequestList = () => {
  const dispatch = useAppDispatch();
  const outcomingRequests = useAppSelector(ContactsSelectors.outcomingRequests);
  const [loading, setLoading] = useDelayedState(!outcomingRequests.length);
  const [hideScrollButton, setHideScrollButton] = useState<boolean>(true);
  const listRef = useRef<VirtualizedListMethods>();

  const refresh = async (): Promise<void> => {
    await dispatch(ContactsActions.fetchOutcomingRequestsThunk());
  };

  /*
  keyExtractor and renderItem
   */

  const keyExtractor = useCallback(
    (index: number): string => {
      return outcomingRequests.length > 0 ? outcomingRequests[index].id : undefined;
    },
    [outcomingRequests],
  );

  const itemRenderer = useCallback(
    ({data, index}: ListChildComponentProps<ContactRequest[]>) => (
      <PageContent>
        <OutcomingRequestListItem request={data[index]} />
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
    loading && !outcomingRequests.length && refresh().finally(() => setLoading(false));
  }, []);

  return (
    <ConditionalSpinner loading={loading}>
      <VirtualizedList
        itemRenderer={itemRenderer}
        keyExtractor={keyExtractor}
        data={outcomingRequests}
        dataCount={outcomingRequests.length}
        setIsOnTop={setHideScrollButton}
        virtualizedListRef={listRef}
      />
      <ScrollCornerButton show={!hideScrollButton} action={scrollUp} />
    </ConditionalSpinner>
  );
};

export default memo(OutcomingRequestList);
