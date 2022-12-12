import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ContactsSelectors from '../../../store/contacts/contactsSelectors';
import {ContactsActions} from '../../../store/contacts/contactsActions';
import {ContactRequest} from '../../../models/Contact';
import ConditionalSpinner from '../../../components/layouts/ConditionalSpinner';
import ScrollCornerButton from '../../../components/surfaces/ScrollCornerButton';
import OutcomingRequestListItem from './OutcomingRequestListItem';
import VirtualizedList, {
  VirtualizedListMethods,
} from '../../../components/layouts/lists/virtualizedList/VirtualizedList';
import ContactListSkeleton from '../skeletons/ContactListSkeleton';
import PageDivider from '../../../components/layouts/PageDivider';
import {Box} from '@mui/material';
import OutcomingRequestListStub from './OutcomingRequestListStub';

const OutcomingRequestList = () => {
  const dispatch = useAppDispatch();
  const outcomingRequests = useAppSelector(ContactsSelectors.outcomingRequests);
  const outcomingRequestsInitialized = useAppSelector(ContactsSelectors.outcomingRequestsInitialized);
  const [loading, setLoading] = useDelayedState(!outcomingRequestsInitialized);
  const [hideScrollButton, setHideScrollButton] = useState<boolean>(true);
  const listMethodsRef = useRef<VirtualizedListMethods>();

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
    (request: ContactRequest, index: number) => (
      <Box>
        {index !== 0 && <PageDivider />}
        <OutcomingRequestListItem request={request} />
      </Box>
    ),
    [],
  );

  /*
  scroll up button
   */

  const scrollUp = (): void => listMethodsRef.current.scrollToTop();

  /*
  Effects
   */

  useEffect(() => {
    loading && refresh().finally(() => setLoading(false));
  }, []);

  return (
    <ConditionalSpinner loading={loading} loadingPlaceholder={<ContactListSkeleton />}>
      {outcomingRequests.length === 0 && <OutcomingRequestListStub />}
      {outcomingRequests.length > 0 && (
        <>
          <VirtualizedList
            itemRenderer={itemRenderer}
            keyExtractor={keyExtractor}
            itemData={outcomingRequests}
            setIsOnTop={setHideScrollButton}
            virtualizedListMethodsRef={listMethodsRef}
          />
          <ScrollCornerButton show={!hideScrollButton} action={scrollUp} />
        </>
      )}
    </ConditionalSpinner>
  );
};

export default memo(OutcomingRequestList);
