import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ContactsSelectors from '../../../store/contacts/contactsSelectors';
import ContactListControl from './ContactListControl';
import {ContactsActions} from '../../../store/contacts/contactsActions';
import InfoSelectors from '../../../store/info/infoSelectors';
import {ContactRelation} from '../../../models/Contact';
import ContactListItem from './ContactListItem';
import VirtualizedList, {VirtualizedListMethods} from '../../../components/layouts/lists/VirtualizedList';
import ScrollCornerButton from '../../../components/surfaces/ScrollCornerButton';
import ConditionalSpinner from '../../../components/layouts/ConditionalSpinner';
import {ListChildComponentProps} from 'react-window';
import FVStack from '../../../components/boxes/FVStack';
import PageContent from '../../../components/layouts/PageContent';

const ContactList = () => {
  const usersSelector = useCallback(InfoSelectors.makeUsersSelector(), []);
  const dispatch = useAppDispatch();
  // const {showContactRequestDialog} = useContactDialogContext();
  const relations = useAppSelector(ContactsSelectors.relations);
  const userIds = relations.map((r) => r.secondUserId);
  const users = useAppSelector((state) => usersSelector(state, userIds));
  const [loading, setLoading] = useDelayedState(!relations.length);
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
    ({data, index}: ListChildComponentProps<ContactRelation[]>) => (
      <PageContent>
        <ContactListItem relation={data[index]} />
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
    loading && !relations.length && refresh().finally(() => setLoading(false));
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
      <PageContent>
        <ContactListControl setFilter={setFilter} />
      </PageContent>
      <ConditionalSpinner loading={loading}>
        <VirtualizedList
          itemRenderer={itemRenderer}
          keyExtractor={keyExtractor}
          data={relationsToShow}
          dataCount={relationsToShow.length}
          setIsOnTop={setHideScrollButton}
          virtualizedListRef={listRef}
        />
        <ScrollCornerButton show={!hideScrollButton} action={scrollUp} />
      </ConditionalSpinner>
    </FVStack>
  );
};

export default memo(ContactList);
