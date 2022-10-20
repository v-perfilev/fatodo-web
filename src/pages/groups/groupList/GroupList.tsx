import React from 'React';
import {useCallback, useEffect, useRef, useState} from 'react';
import {GroupsActions} from '../../../store/groups/groupsActions';
import VirtualizedList, {VirtualizedListMethods} from '../../../components/layouts/lists/VirtualizedList';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import GroupsSelectors from '../../../store/groups/groupsSelectors';
import GroupListCard from './groupListCard/GroupListCard';
import {Group} from '../../../models/Group';
import {ListChildComponentProps} from 'react-window';
import SortableList from '../../../components/layouts/lists/SortableList';
import PageContainer from '../../../components/layouts/PageContainer';
import {Container} from '@mui/material';
import GroupListHeader from './GroupListHeader';
import ScrollCornerButton from '../../../components/surfaces/ScrollCornerButton';
import {PAGE_HEADER_HEIGHT} from '../../../constants';

const GroupList = () => {
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
    ({data, index}: ListChildComponentProps<Group[]>, drag?: any) => (
      <Container>
        <GroupListCard group={data[index]} sorting={sorting} drag={drag} />
      </Container>
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
    <PageContainer>
      <GroupListHeader sorting={sorting} setSorting={setSorting} order={order} />
      {sorting ? (
        <SortableList
          itemRenderer={itemRenderer}
          data={groups}
          dataCount={groups.length}
          setOrder={setOrder}
          paddingTop={PAGE_HEADER_HEIGHT + 10}
        />
      ) : (
        <VirtualizedList
          itemRenderer={itemRenderer}
          keyExtractor={keyExtractor}
          data={groups}
          dataCount={groups.length}
          paddingTop={PAGE_HEADER_HEIGHT + 10}
          setIsOnTop={setHideScrollButton}
          virtualizedListRef={listRef}
        />
      )}
      <ScrollCornerButton show={!sorting && !hideScrollButton} action={scrollUp} />
    </PageContainer>
  );
};

export default GroupList;
