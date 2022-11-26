import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import GroupSelectors from '../../../store/group/groupSelectors';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import AuthSelectors from '../../../store/auth/authSelectors';
import {GroupUtils} from '../../../shared/utils/GroupUtils';
import {GroupActions} from '../../../store/group/groupActions';
import {Item} from '../../../models/Item';
import GroupItem from '../components/groupItem/GroupItem';
import ScrollCornerButton from '../../../components/surfaces/ScrollCornerButton';
import GroupViewHeader from './GroupViewHeader';
import ConditionalSpinner from '../../../components/layouts/ConditionalSpinner';
import {DEFAULT_MARGIN, PAGE_HEADER_HEIGHT} from '../../../constants';
import PageContent from '../../../components/layouts/PageContent';
import VirtualizedList, {
  VirtualizedListMethods,
} from '../../../components/layouts/lists/virtualizedList/VirtualizedList';
import {Group} from '../../../models/Group';
import PageDivider from '../../../components/layouts/PageDivider';
import GroupViewListSkeleton from '../skeletons/GroupViewListSkeleton';
import GroupViewStub from './GroupViewStub';

type GroupViewContainerProps = {
  group: Group;
  groupId: string;
  loading: boolean;
  toggleCollapsed?: () => void;
};

const GroupViewContainer = ({group, groupId, loading, toggleCollapsed}: GroupViewContainerProps) => {
  const [showArchived, setShowArchived] = useState<boolean>(false);
  const itemsSelector = useCallback(GroupSelectors.makeItemsSelector(), []);
  const allItemsLoadedSelector = useCallback(GroupSelectors.makeAllItemsLoadedSelector(), []);
  const dispatch = useAppDispatch();
  const account = useAppSelector(AuthSelectors.account);
  const items = useAppSelector((state) => itemsSelector(state, showArchived));
  const allItemsLoaded = useAppSelector((state) => allItemsLoadedSelector(state, showArchived));
  const [hideScrollButton, setHideScrollButton] = useState<boolean>(true);
  const listRef = useRef<VirtualizedListMethods>();

  const canEdit = useMemo<boolean>(() => {
    return group && GroupUtils.canEdit(account, group);
  }, [group, account]);

  /*
  loaders
   */

  const initialLoad = useCallback(async (): Promise<void> => {
    showArchived
      ? dispatch(GroupActions.fetchArchivedItemsThunk({groupId, offset: 0}))
      : dispatch(GroupActions.fetchActiveItemsThunk({groupId, offset: 0}));
  }, [items, showArchived]);

  const load = useCallback(async (): Promise<void> => {
    const offset = items.length;
    showArchived
      ? dispatch(GroupActions.fetchArchivedItemsThunk({groupId, offset}))
      : dispatch(GroupActions.fetchActiveItemsThunk({groupId, offset}));
  }, [items, showArchived]);

  const refresh = useCallback(async (): Promise<void> => {
    showArchived
      ? dispatch(GroupActions.refreshArchivedItemsThunk(groupId))
      : dispatch(GroupActions.refreshActiveItemsThunk(groupId));
  }, [showArchived]);

  /*
  keyExtractor and renderItem
   */

  const keyExtractor = useCallback(
    (index: number): string => {
      return items.length > 0 ? items[index].id : undefined;
    },
    [items],
  );

  const itemRenderer = useCallback(
    (item: Item, index: number) => (
      <PageContent maxWidth="md">
        {index !== 0 && <PageDivider />}
        <GroupItem item={item} canEdit={canEdit} />
      </PageContent>
    ),
    [items],
  );

  /*
  scroll up button
   */

  const scrollUp = (): void => listRef.current.scrollToTop();

  /*
  Effects
   */

  useEffect(() => {
    if (loading || (items.length === 0 && !allItemsLoaded)) {
      initialLoad().finally();
    }
  }, [showArchived]);

  return (
    <ConditionalSpinner loading={loading} loadingPlaceholder={<GroupViewListSkeleton />}>
      <GroupViewHeader
        refresh={refresh}
        showArchived={showArchived}
        setShowArchived={setShowArchived}
        toggleCollapsed={toggleCollapsed}
      />
      {items.length === 0 && <GroupViewStub />}
      {items.length > 0 && (
        <>
          <VirtualizedList
            itemRenderer={itemRenderer}
            keyExtractor={keyExtractor}
            itemData={items}
            allLoaded={allItemsLoaded}
            loadMoreItems={load}
            paddingTop={PAGE_HEADER_HEIGHT + DEFAULT_MARGIN}
            paddingBottom={8}
            setIsOnTop={setHideScrollButton}
            virtualizedListRef={listRef}
          />
          <ScrollCornerButton show={!hideScrollButton} action={scrollUp} />
        </>
      )}
    </ConditionalSpinner>
  );
};

export default GroupViewContainer;
