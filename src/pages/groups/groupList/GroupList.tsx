import React from 'React';
import {useCallback, useEffect, useRef, useState} from 'react';
import {GroupsActions} from '../../../store/groups/groupsActions';
import VirtualizedList, {VirtualizedListMethods} from '../../../components/layouts/virtualizedList/VirtualizedList';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {useNavigate} from 'react-router-dom';
import GroupsSelectors from '../../../store/groups/groupsSelectors';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import {GroupRouteUtils} from '../../../routes/GroupRouter';
import GroupListCard from './groupListCard/GroupListCard';
import {Group} from '../../../models/Group';
import {ListChildComponentProps} from 'react-window';

const GroupList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const groups = useAppSelector(GroupsSelectors.groups);
  const [loading, setLoading] = useDelayedState();
  const [sorting, setSorting] = useState<boolean>(false);
  const listRef = useRef<VirtualizedListMethods>();

  const goToGroupCreate = useCallback(() => navigate(GroupRouteUtils.getCreateUrl()), []);

  /*
  loaders
   */

  const refresh = useCallback(async (): Promise<void> => {
    await dispatch(GroupsActions.fetchGroupsThunk());
  }, []);

  /*
  keyExtractor and renderItem
   */

  const keyExtractor = useCallback(
    (index: number): string => {
      return groups.length > 0 ? groups[index].id : undefined;
    },
    [groups],
  );

  const itemRenderer = useCallback(
    ({data, index}: ListChildComponentProps<Group[]>) => (
      <GroupListCard group={data[index]} sorting={sorting} drag={sorting ? undefined : undefined} />
    ),
    [groups, sorting],
  );

  /*
  dragHandler
   */

  // const handleDragEnd = useCallback(({data}: DragEndParams<Group>): void => {
  //   dispatch(GroupsActions.setGroups(data));
  // }, []);

  /*
  scroll up button
   */

  const scrollUp = (): void => listRef.current.scrollToTop();

  /*
  effects
   */

  useEffect(() => {
    dispatch(GroupsActions.fetchGroupsThunk()).finally(() => setLoading(false));
  }, []);

  return (
    <VirtualizedList
      itemRenderer={itemRenderer}
      keyExtractor={keyExtractor}
      itemData={groups}
      itemCount={groups.length}
      virtualizedListRef={listRef}
    />
  );
};

export default GroupList;
