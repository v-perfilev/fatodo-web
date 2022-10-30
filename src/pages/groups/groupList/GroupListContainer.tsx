import React from 'React';
import {useCallback, useEffect, useRef, useState} from 'react';
import {GroupsActions} from '../../../store/groups/groupsActions';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import GroupsSelectors from '../../../store/groups/groupsSelectors';
import GroupListCard from './groupListCard/GroupListCard';
import {Group} from '../../../models/Group';
import SortableList from '../../../components/layouts/lists/SortableList';
import PageContainer from '../../../components/layouts/PageContainer';
import GroupListHeader from './GroupListHeader';
import ScrollCornerButton from '../../../components/surfaces/ScrollCornerButton';
import {PAGE_HEADER_HEIGHT} from '../../../constants';
import PageContent from '../../../components/layouts/PageContent';
import VirtualizedList, {
  VirtualizedListMethods,
} from '../../../components/layouts/lists/virtualizedList/VirtualizedList';

type GroupListContainerProps = {
  toggleCollapsed?: () => void;
};

const GroupListContainer = ({toggleCollapsed}: GroupListContainerProps) => {
  const dispatch = useAppDispatch();
  const groups = useAppSelector(GroupsSelectors.groups);
  const [sorting, setSorting] = useState<boolean>(false);
  const [hideScrollButton, setHideScrollButton] = useState<boolean>(true);
  const [order, setOrder] = useState<number[]>(undefined);
  const listRef = useRef<VirtualizedListMethods>();

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
    (group: Group, drag?: any) => (
      <PageContent maxWidth="md">
        <GroupListCard group={group} sorting={sorting} drag={drag} />
      </PageContent>
    ),
    [groups, sorting],
  );

  /*
  scroll up button
   */

  const scrollUp = (): void => listRef.current.scrollToTop();

  /*
  effects
   */

  useEffect(() => {
    groups.length === 0 && dispatch(GroupsActions.fetchGroupsThunk());
  }, []);

  return (
    <PageContainer withoutContainer>
      <GroupListHeader sorting={sorting} setSorting={setSorting} order={order} toggleCollapsed={toggleCollapsed} />
      {sorting ? (
        <SortableList
          itemRenderer={itemRenderer}
          data={groups}
          dataCount={groups.length}
          setOrder={setOrder}
          paddingTop={PAGE_HEADER_HEIGHT + 8}
          paddingBottom={8}
        />
      ) : (
        <VirtualizedList
          itemRenderer={itemRenderer}
          itemData={groups}
          keyExtractor={keyExtractor}
          paddingTop={PAGE_HEADER_HEIGHT + 8}
          paddingBottom={8}
          setIsOnTop={setHideScrollButton}
          virtualizedListRef={listRef}
        />
      )}
      <ScrollCornerButton show={!sorting && !hideScrollButton} action={scrollUp} />
    </PageContainer>
  );
};

export default GroupListContainer;
