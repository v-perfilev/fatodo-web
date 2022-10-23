import React, {FC, useEffect, useMemo, useState} from 'react';
import {Box} from '@material-ui/core';
import {groupViewItemsStyles} from './_styles';
import {useGroupViewContext} from '../../../../shared/contexts/view-contexts/group-view-context';
import {useItemListContext} from '../../../../shared/contexts/list-contexts/item-list-context';
import GroupViewCreateButton from '../group-view-create-button';
import {GroupUtils} from '../../../../shared/utils/group.utils';
import {UserAccount} from '../../../../models/user.model';
import {useArchivedItemListContext} from '../../../../shared/contexts/list-contexts/archived-item-list-context';
import GroupViewItemsPagination from './group-view-items-pagination';
import {Item} from '../../../../models/item.model';
import {CARD_ITEMS_COUNT, GROUP_ITEMS_COUNT} from '../../_constants';
import {useUserListContext} from '../../../../shared/contexts/list-contexts/user-list-context';
import GroupViewItem from '../group-view-item/group-view-item';
import GroupViewSkeletonItems from '../group-view-skeleton/group-view-skeleton-items';
import {useLoadingState} from '../../../../shared/hooks/use-loading-state';

type Props = {
  showArchived: boolean;
  account: UserAccount;
};

const GroupViewItems: FC<Props> = ({showArchived, account}: Props) => {
  const classes = groupViewItemsStyles();
  const {handleUserIds} = useUserListContext();
  const {group} = useGroupViewContext();
  const {items: active, count: activeCount, load: loadActive, loading: activeLoading} = useItemListContext();
  const {
    items: archived,
    count: archivedCount,
    load: loadArchived,
    loading: archivedLoading,
  } = useArchivedItemListContext();
  const [loading, setLoading] = useLoadingState();
  const [page, setPage] = useState<number>(0);

  const items = useMemo<Item[]>(() => {
    return showArchived ? archived : active;
  }, [active, archived, showArchived]);

  const count = useMemo<number>(() => {
    return showArchived ? archivedCount : activeCount;
  }, [activeCount, archivedCount, showArchived]);

  const totalPages = useMemo<number>(() => {
    return Math.floor(count / GROUP_ITEMS_COUNT) + (count % GROUP_ITEMS_COUNT > 0 ? 1 : 0);
  }, [count]);

  const itemsToShow = useMemo<Item[]>(() => {
    const firstShownItem = GROUP_ITEMS_COUNT * page;
    return items.length > firstShownItem ? items.slice(firstShownItem, firstShownItem + GROUP_ITEMS_COUNT) : [];
  }, [items, page]);

  const loadItemsUsers = (): void => {
    const userIds = items.reduce((acc, item) => [...acc, item.createdBy, item.lastModifiedBy], []);
    handleUserIds(userIds);
  };

  const resetPage = (): void => {
    setPage(0);
  };

  const loadInitial = (load: (groupId: string, offset?: number, size?: number) => void): void => {
    load(group.id);
  };

  const loadMoreIfNeeded = (load: (groupId: string, offset: number, size: number) => void): void => {
    const firstShownItem = GROUP_ITEMS_COUNT * page;
    if (items.length < count && items.length < firstShownItem + GROUP_ITEMS_COUNT) {
      load(group.id, items.length, CARD_ITEMS_COUNT * 2);
    }
  };

  useEffect(() => {
    if (items.length > 0) {
      loadItemsUsers();
    }
  }, [items]);

  useEffect(() => {
    resetPage();
    if (showArchived) {
      loadInitial(loadArchived);
    } else {
      loadInitial(loadActive);
    }
  }, [group.id, showArchived]);

  useEffect(() => {
    if (page > 0 && showArchived) {
      loadMoreIfNeeded(loadArchived);
    } else if (page > 0 && !showArchived) {
      loadMoreIfNeeded(loadActive);
    }
  }, [page]);

  useEffect(() => {
    const newLoading = activeLoading || archivedLoading;
    setLoading(newLoading);
  }, [activeLoading, archivedLoading]);

  const canEdit = useMemo<boolean>(() => group && GroupUtils.canEdit(account, group), [group, account]);

  return (
    <Box className={classes.root}>
      <GroupViewCreateButton group={group} />
      {loading && <GroupViewSkeletonItems />}
      {!loading && itemsToShow.map((item) => <GroupViewItem item={item} canEdit={canEdit} key={item.id} />)}
      <GroupViewItemsPagination page={page} totalPages={totalPages} setPage={setPage} />
    </Box>
  );
};
export default GroupViewItems;