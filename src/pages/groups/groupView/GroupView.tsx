import React from 'React';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import withGroupContainer, {WithGroupProps} from '../../../shared/hocs/withContainers/withGroupContainer';
import GroupSelectors from '../../../store/group/groupSelectors';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import AuthSelectors from '../../../store/auth/authSelectors';
import {GroupUtils} from '../../../shared/utils/GroupUtils';
import {GroupActions} from '../../../store/group/groupActions';
import {Item} from '../../../models/Item';
import GroupItem from '../components/groupItem/GroupItem';
import PageContainer from '../../../components/layouts/PageContainer';
import ScrollCornerButton from '../../../components/surfaces/ScrollCornerButton';
import GroupViewHeader from './GroupViewHeader';
import {flowRight} from 'lodash';
import withThemeProvider from '../../../shared/hocs/withThemeProvider';
import ConditionalSpinner from '../../../components/layouts/ConditionalSpinner';
import {PAGE_HEADER_HEIGHT} from '../../../constants';
import PageContent from '../../../components/layouts/PageContent';
import VirtualizedList, {
  VirtualizedListMethods,
} from '../../../components/layouts/lists/virtualizedList/VirtualizedList';

const GroupView = ({group, groupId, loading}: WithGroupProps) => {
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
    (item: Item) => (
      <PageContent>
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
    <PageContainer withoutContainer>
      <ConditionalSpinner loading={loading}>
        <PageContent>
          <GroupViewHeader refresh={refresh} showArchived={showArchived} setShowArchived={setShowArchived} />
        </PageContent>
        <VirtualizedList
          itemRenderer={itemRenderer}
          keyExtractor={keyExtractor}
          itemData={items}
          allLoaded={allItemsLoaded}
          loadMoreItems={load}
          paddingTop={PAGE_HEADER_HEIGHT}
          setIsOnTop={setHideScrollButton}
          virtualizedListRef={listRef}
        />
        <ScrollCornerButton show={!hideScrollButton} action={scrollUp} />
      </ConditionalSpinner>
    </PageContainer>
  );
};

export default flowRight([withGroupContainer, withThemeProvider])(GroupView);
