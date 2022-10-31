import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ContactsSelectors from '../../../store/contacts/contactsSelectors';
import {ContactsActions} from '../../../store/contacts/contactsActions';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import {ContactRequest} from '../../../models/Contact';
import IncomingRequestListItem from './IncomingRequestListItem';
import ScrollCornerButton from '../../../components/surfaces/ScrollCornerButton';
import ConditionalSpinner from '../../../components/layouts/ConditionalSpinner';
import PageContent from '../../../components/layouts/PageContent';
import VirtualizedList, {
  VirtualizedListMethods,
} from '../../../components/layouts/lists/virtualizedList/VirtualizedList';
import ContactListSkeleton from '../skeletons/ContactListSkeleton';
import PageDivider from '../../../components/layouts/PageDivider';

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
    (request: ContactRequest, index: number) => (
      <PageContent maxWidth="md">
        {index !== 0 && <PageDivider />}
        <IncomingRequestListItem request={request} />
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
    loading && refresh().finally(() => setLoading(false));
  }, []);

  return (
    <ConditionalSpinner loading={loading} loadingPlaceholder={<ContactListSkeleton />}>
      <VirtualizedList
        itemRenderer={itemRenderer}
        keyExtractor={keyExtractor}
        itemData={incomingRequests}
        setIsOnTop={setHideScrollButton}
        virtualizedListRef={listRef}
      />
      <ScrollCornerButton show={!hideScrollButton} action={scrollUp} />
    </ConditionalSpinner>
  );
};

export default memo(IncomingRequestList);
