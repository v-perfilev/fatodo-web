import React, {useCallback, useEffect, useRef, useState} from 'react';
import {GroupsActions} from '../../../store/groups/groupsActions';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import GroupsSelectors from '../../../store/groups/groupsSelectors';
import GroupListCard from './groupListCard/GroupListCard';
import {Group} from '../../../models/Group';
import SortableList from '../../../components/layouts/lists/SortableList';
import GroupListHeader from './GroupListHeader';
import ScrollCornerButton from '../../../components/surfaces/ScrollCornerButton';
import {DEFAULT_MARGIN, PAGE_HEADER_HEIGHT} from '../../../constants';
import PageContent from '../../../components/layouts/PageContent';
import VirtualizedList, {
  VirtualizedListMethods,
} from '../../../components/layouts/lists/virtualizedList/VirtualizedList';
import {useDelayedState} from '../../../shared/hooks/useDelayedState';
import ConditionalSpinner from '../../../components/layouts/ConditionalSpinner';
import GroupListStub from './GroupListStub';

type GroupListContainerProps = {
  toggleCollapsed?: () => void;
};

const GroupListContainer = ({toggleCollapsed}: GroupListContainerProps) => {
  const dispatch = useAppDispatch();
  const groups = useAppSelector(GroupsSelectors.groups);
  const groupsInitialized = useAppSelector(GroupsSelectors.groupsInitialized);
  const [loading, setLoading] = useDelayedState(!groupsInitialized);
  const [sorting, setSorting] = useState<boolean>(false);
  const [hideScrollButton, setHideScrollButton] = useState<boolean>(true);
  const [order, setOrder] = useState<number[]>(undefined);
  const [width, setWidth] = useState<number>();
  const listMethodsRef = useRef<VirtualizedListMethods>();

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

  const scrollUp = (): void => listMethodsRef.current.scrollToTop();

  /*
  effects
   */

  useEffect(() => {
    loading && dispatch(GroupsActions.fetchGroupsThunk()).finally(() => setLoading(false));
  }, []);

  return (
    <>
      <GroupListHeader
        width={width}
        sorting={sorting}
        setSorting={setSorting}
        order={order}
        toggleCollapsed={toggleCollapsed}
      />
      <ConditionalSpinner loading={loading}>
        {groups.length === 0 && <GroupListStub />}
        {groups.length > 0 && sorting && (
          <>
            <SortableList
              itemRenderer={itemRenderer}
              data={groups}
              dataCount={groups.length}
              setOrder={setOrder}
              paddingTop={PAGE_HEADER_HEIGHT + DEFAULT_MARGIN}
              paddingBottom={8}
            />
            <ScrollCornerButton show={!sorting && !hideScrollButton} action={scrollUp} />
          </>
        )}
        {groups.length > 0 && !sorting && (
          <>
            <VirtualizedList
              itemRenderer={itemRenderer}
              itemData={groups}
              keyExtractor={keyExtractor}
              paddingTop={PAGE_HEADER_HEIGHT + DEFAULT_MARGIN}
              paddingBottom={8}
              setIsOnTop={setHideScrollButton}
              virtualizedListMethodsRef={listMethodsRef}
              setWidth={setWidth}
            />
            <ScrollCornerButton show={!sorting && !hideScrollButton} action={scrollUp} />
          </>
        )}
      </ConditionalSpinner>
    </>
  );
};

export default GroupListContainer;
