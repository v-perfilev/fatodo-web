import React from 'React';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import VirtualizedList, {VirtualizedListMethods} from '../../../components/layouts/lists/VirtualizedList';
import withGroupContainer, {WithGroupProps} from '../../../shared/hocs/withContainers/withGroupContainer';
import GroupSelectors from '../../../store/group/groupSelectors';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import AuthSelectors from '../../../store/auth/authSelectors';
import {GroupUtils} from '../../../shared/utils/GroupUtils';
import {useNavigate} from 'react-router-dom';
import {ItemRouteUtils} from '../../../routes/ItemRouter';
import {GroupActions} from '../../../store/group/groupActions';
import {Item} from '../../../models/Item';
import {ListChildComponentProps} from 'react-window';
import {Container} from '@mui/material';
import GroupItem from '../components/groupItem/GroupItem';
import PageContainer from '../../../components/layouts/PageContainer';
import ScrollCornerButton from '../../../components/surfaces/ScrollCornerButton';
import GroupViewHeader from './GroupViewHeader';

const GroupView = ({group, groupId, loading}: WithGroupProps) => {
  const [showArchived, setShowArchived] = useState<boolean>(false);
  const itemsSelector = useCallback(GroupSelectors.makeItemsSelector(), []);
  const allItemsLoadedSelector = useCallback(GroupSelectors.makeAllItemsLoadedSelector(), []);
  const dispatch = useAppDispatch();
  const account = useAppSelector(AuthSelectors.account);
  const items = useAppSelector((state) => itemsSelector(state, showArchived));
  const allItemsLoaded = useAppSelector((state) => allItemsLoadedSelector(state, showArchived));
  const navigate = useNavigate();
  const [hideScrollButton, setHideScrollButton] = useState<boolean>(true);
  const listRef = useRef<VirtualizedListMethods>();

  const canEdit = useMemo<boolean>(() => {
    return group && GroupUtils.canEdit(account, group);
  }, [group, account]);

  const goToItemCreate = (): void => navigate(ItemRouteUtils.getCreateUrl(group?.id));

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
  stub, keyExtractor and renderItem
   */

  const keyExtractor = useCallback(
    (index: number): string => {
      return items.length > 0 ? items[index].id : undefined;
    },
    [items],
  );

  const itemRenderer = useCallback(
    ({data, index}: ListChildComponentProps<Item[]>) => (
      <Container>
        {/*<GroupListCard group={data[index]} sorting={sorting} drag={drag} />*/}
        <GroupItem item={data[index]} canEdit={canEdit} />
      </Container>
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
    <PageContainer>
      <GroupViewHeader refresh={refresh} showArchived={showArchived} setShowArchived={setShowArchived} />
      <VirtualizedList
        itemRenderer={itemRenderer}
        keyExtractor={keyExtractor}
        data={items}
        dataCount={items.length}
        loadMoreItems={load}
        paddingTop={53}
        setIsOnTop={setHideScrollButton}
        virtualizedListRef={listRef}
      />
      <ScrollCornerButton show={!hideScrollButton} action={scrollUp} />
    </PageContainer>
  );
};

export default withGroupContainer(GroupView);
