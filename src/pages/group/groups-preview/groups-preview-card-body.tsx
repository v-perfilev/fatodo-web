import * as React from 'react';
import {FC, memo, useEffect, useMemo, useState} from 'react';
import GroupsPreviewCardFooter from './groups-preview-card-footer';
import GroupPreviewCardContent from './groups-preview-card-content';
import {Item} from '../../../models/item.model';
import {useGroupListItemsContext} from '../../../shared/contexts/list-contexts/group-list-items-context';
import {useGroupViewContext} from '../../../shared/contexts/view-contexts/group-view-context';
import {CARD_ITEMS_COUNT, CARD_ITEMS_FIRST_PAGE_COUNT} from '../_constants';

const GroupsPreviewCardBody: FC = () => {
  const {group} = useGroupViewContext();
  const {items: previewItems, counts: previewCounts, loadMore: loadMoreItems} = useGroupListItemsContext();
  const [page, setPage] = useState<number>(0);

  const items = useMemo<Item[]>(() => {
    return group && previewItems.has(group.id) ? previewItems.get(group.id) : [];
  }, [group, previewItems]);

  const count = useMemo<number>(() => {
    return group && previewCounts.has(group.id) ? previewCounts.get(group.id) : 0;
  }, [group, previewCounts]);

  const totalPages = useMemo<number>(() => {
    const firstPageRest = count - CARD_ITEMS_FIRST_PAGE_COUNT;
    const firstPageCounter = firstPageRest > 0 ? 1 : 0;
    const otherPagesCounter = firstPageRest > 0 ? Math.floor(firstPageRest / CARD_ITEMS_COUNT) : 0;
    const lastNotFullPageCounter = firstPageRest > 0 && firstPageRest % CARD_ITEMS_COUNT > 0 ? 1 : 0;
    return firstPageCounter + otherPagesCounter + lastNotFullPageCounter;
  }, [group, count]);

  const itemsToShow = useMemo<Item[]>(() => {
    const firstPageItems = page > 0 ? CARD_ITEMS_FIRST_PAGE_COUNT : 0;
    const otherPagesItems = page > 1 ? CARD_ITEMS_COUNT * (page - 1) : 0;
    const firstShownItem = firstPageItems + otherPagesItems;
    const itemsInPage = page == 0 ? CARD_ITEMS_FIRST_PAGE_COUNT : CARD_ITEMS_COUNT;
    return items?.length > firstShownItem ? items.slice(firstShownItem, firstShownItem + itemsInPage) : [];
  }, [items, count, page]);

  const loadMoreIfNeeded = (): void => {
    const firstPageItems = page > 0 ? CARD_ITEMS_FIRST_PAGE_COUNT : 0;
    const otherPagesItems = page > 1 ? CARD_ITEMS_COUNT * (page - 1) : 0;
    const firstShownItem = firstPageItems + otherPagesItems;
    if (items.length < count && items.length < firstShownItem + CARD_ITEMS_COUNT) {
      loadMoreItems(group.id, items.length, CARD_ITEMS_COUNT * 2);
    }
  };

  useEffect(() => {
    if (page > 0) {
      loadMoreIfNeeded();
    }
  }, [page]);

  return (
    <>
      <GroupPreviewCardContent itemsToShow={itemsToShow} isFirstPage={page == 0} />
      <GroupsPreviewCardFooter page={page} totalPages={totalPages} setPage={setPage} itemsCount={count} />
    </>
  );
};

export default memo(GroupsPreviewCardBody);
