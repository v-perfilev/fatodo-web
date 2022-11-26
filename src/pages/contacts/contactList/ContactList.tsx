import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ContactsSelectors from '../../../store/contacts/contactsSelectors';
import ContactListControl from './ContactListControl';
import {ContactsActions} from '../../../store/contacts/contactsActions';
import InfoSelectors from '../../../store/info/infoSelectors';
import {ContactRelation} from '../../../models/Contact';
import ContactListItem from './ContactListItem';
import ScrollCornerButton from '../../../components/surfaces/ScrollCornerButton';
import ConditionalSpinner from '../../../components/layouts/ConditionalSpinner';
import FVStack from '../../../components/boxes/FVStack';
import VirtualizedList, {
  VirtualizedListMethods,
} from '../../../components/layouts/lists/virtualizedList/VirtualizedList';
import ContactListSkeleton from '../skeletons/ContactListSkeleton';
import PageDivider from '../../../components/layouts/PageDivider';
import {Box} from '@mui/material';
import ContactListStub from './ContactListStub';

const ContactList = () => {
  const usersSelector = useCallback(InfoSelectors.makeUsersSelector(), []);
  const dispatch = useAppDispatch();
  const relations = useAppSelector(ContactsSelectors.relations);
  const relationsInitialized = useAppSelector(ContactsSelectors.relationsInitialized);
  const userIds = relations.map((r) => r.secondUserId);
  const users = useAppSelector((state) => usersSelector(state, userIds));
  const [loading, setLoading] = useDelayedState(!relationsInitialized);
  const [filter, setFilter] = useState<string>('');
  const [relationsToShow, setRelationsToShow] = useState<ContactRelation[]>([]);
  const [hideScrollButton, setHideScrollButton] = useState<boolean>(true);
  const listRef = useRef<VirtualizedListMethods>();

  const refresh = useCallback(async (): Promise<void> => {
    await dispatch(ContactsActions.fetchRelationsThunk());
  }, []);

  /*
  keyExtractor and renderItem
   */

  const keyExtractor = useCallback(
    (index: number): string => {
      return relationsToShow.length > 0 ? relationsToShow[index].id : undefined;
    },
    [relationsToShow],
  );

  const itemRenderer = useCallback(
    (relation: ContactRelation, index: number) => (
      <Box>
        {index !== 0 && <PageDivider />}
        <ContactListItem relation={relation} />
      </Box>
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

  useEffect(() => {
    const relationsToShow = filter
      ? relations.filter((r) => {
          const user = users.find((u) => u.id === r.secondUserId);
          const str = user?.username + user?.firstname + user?.lastname;
          return str?.includes(filter);
        })
      : relations;
    setRelationsToShow(relationsToShow);
  }, [relations, filter]);

  return (
    <FVStack>
      <ContactListControl setFilter={setFilter} />
      <ConditionalSpinner loading={loading} loadingPlaceholder={<ContactListSkeleton />}>
        {relations.length === 0 && <ContactListStub />}
        {relations.length > 0 && (
          <>
            <VirtualizedList
              itemRenderer={itemRenderer}
              itemData={relationsToShow}
              keyExtractor={keyExtractor}
              setIsOnTop={setHideScrollButton}
              virtualizedListRef={listRef}
            />
            <ScrollCornerButton show={!hideScrollButton} action={scrollUp} />
          </>
        )}
      </ConditionalSpinner>
    </FVStack>
  );
};

export default memo(ContactList);
