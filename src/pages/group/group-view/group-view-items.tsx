import React, {CSSProperties, FC, useEffect, useMemo, useState} from 'react';
import {Box} from '@material-ui/core';
import {groupViewItemsStyles} from './_styles';
import GroupViewItem from './group-view-item';
import {useGroupViewContext} from '../../../shared/contexts/view-contexts/group-view-context';
import {useItemListContext} from '../../../shared/contexts/list-contexts/item-list-context';
import {CircularSpinner} from '../../../components/loaders';
import GroupViewCreateButton from './group-view-create-button';
import {GroupUtils} from '../../../shared/utils/group.utils';
import {UserAccount} from '../../../models/user.model';
import {useArchivedItemListContext} from '../../../shared/contexts/list-contexts/archived-item-list-context';
import GroupViewItemsHeader from './group-view-items-header';
import GroupViewItemsFooter from './group-view-items-footer';
import {Item} from '../../../models/item.model';
import {ITEMS_IN_GROUP, ITEMS_IN_PREVIEW_CARD} from '../_constants';
import {useTrail} from 'react-spring';

type Props = {
  account: UserAccount;
};

const GroupViewItems: FC<Props> = ({account}: Props) => {
  const classes = groupViewItemsStyles();
  const [showArchived, setShowArchived] = useState<boolean>(false);
  const {group} = useGroupViewContext();
  const {items: active, count: activeCount, load: loadActive, loading: activeLoading} = useItemListContext();
  const {
    items: archived,
    count: archivedCount,
    load: loadArchived,
    loading: archivedLoading,
  } = useArchivedItemListContext();
  const [page, setPage] = useState<number>(0);

  const loading = useMemo<boolean>(() => activeLoading || archivedLoading, [activeLoading, archivedLoading]);
  const canEdit = useMemo<boolean>(() => group && GroupUtils.canEdit(account, group), [group, account]);

  const items = useMemo<Item[]>(() => {
    return showArchived ? archived : active;
  }, [active, archived, showArchived]);

  const count = useMemo<number>(() => {
    return showArchived ? archivedCount : activeCount;
  }, [activeCount, archivedCount, showArchived]);

  const totalPages = useMemo<number>(() => {
    return 1 + Math.floor(count / ITEMS_IN_GROUP) + (count % ITEMS_IN_GROUP) > 0 ? 1 : 0;
  }, [count]);

  const itemsToShow = useMemo<Item[]>(() => {
    const firstShownItem = ITEMS_IN_GROUP * page;
    return items?.length > firstShownItem ? items.slice(firstShownItem, firstShownItem + ITEMS_IN_GROUP) : [];
  }, [items, page]);

  const loadInitial = (load: (groupId: string, offset?: number, size?: number) => void): void => {
    load(group.id);
  };

  const loadMoreIfNeeded = (load: (groupId: string, offset: number, size: number) => void): void => {
    const firstShownItem = ITEMS_IN_GROUP * page;
    if (items.length < count && items.length < firstShownItem + ITEMS_IN_GROUP) {
      load(group.id, items.length, ITEMS_IN_PREVIEW_CARD * 2);
    }
  };

  useEffect(() => {
    if (!items && showArchived) {
      loadInitial(loadArchived);
    } else if (!items && !showArchived) {
      loadInitial(loadActive);
    }
  }, [showArchived]);

  useEffect(() => {
    if (page > 0 && showArchived) {
      loadMoreIfNeeded(loadArchived);
    } else if (page > 0 && !showArchived) {
      loadMoreIfNeeded(loadActive);
    }
  }, [page, showArchived]);

  const trail = useTrail(itemsToShow.length, {
    delay: 35,
    opacity: 1,
    from: {opacity: 0},
  });

  return (
    <Box className={classes.root}>
      <GroupViewItemsHeader showArchived={showArchived} setShowArchived={setShowArchived} />
      {loading && <CircularSpinner size="sm" />}
      {!loading && <GroupViewCreateButton group={group} />}
      {!loading &&
        trail.map((style: CSSProperties, index) => (
          <GroupViewItem item={itemsToShow[index]} canEdit={canEdit} style={style} key={index} />
        ))}
      <GroupViewItemsFooter page={page} totalPages={totalPages} setPage={setPage} />
    </Box>
  );
};
export default GroupViewItems;
