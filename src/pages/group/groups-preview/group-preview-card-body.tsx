import * as React from 'react';
import {FC, memo, useEffect, useMemo, useState} from 'react';
import GroupPreviewCardFooter from './group-preview-card-footer';
import GroupPreviewCardContent from './group-preview-card-content';
import {Item} from '../../../models/item.model';
import {usePreviewItemListContext} from '../../../shared/contexts/list-contexts/preview-item-list-context';
import {useGroupViewContext} from '../../../shared/contexts/view-contexts/group-view-context';
import {ITEMS_IN_FIRST_PAGE_PREVIEW_CARD, ITEMS_IN_PREVIEW_CARD} from '../_constants';

const GroupPreviewCardBody: FC = () => {
  const {group} = useGroupViewContext();
  const {items: previewItems, counts: previewCounts, loadMore: loadMoreItems} = usePreviewItemListContext();
  const [page, setPage] = useState<number>(0);

  const items = useMemo<Item[]>(() => {
    return group && previewItems.has(group.id) ? previewItems.get(group.id) : [];
  }, [group, previewItems]);

  const count = useMemo<number>(() => {
    return group && previewCounts.has(group.id) ? previewCounts.get(group.id) : 0;
  }, [group, previewCounts]);

  const totalPages = useMemo<number>(() => {
    const firstPageRest = count - ITEMS_IN_FIRST_PAGE_PREVIEW_CARD;
    const firstPageCounter = firstPageRest > 0 ? 1 : 0;
    const otherPagesCounter = firstPageRest > 0 ? Math.floor(firstPageRest / ITEMS_IN_PREVIEW_CARD) : 0;
    const lastNotFullPageCounter = firstPageRest > 0 ? firstPageRest % ITEMS_IN_PREVIEW_CARD : 0;
    return 1 + firstPageCounter + otherPagesCounter + lastNotFullPageCounter;
  }, [group, count]);

  const itemsToShow = useMemo<Item[]>(() => {
    const firstPageItems = page > 0 ? ITEMS_IN_FIRST_PAGE_PREVIEW_CARD : 0;
    const otherPagesItems = page > 1 ? ITEMS_IN_PREVIEW_CARD * (page - 1) : 0;
    const firstShownItem = firstPageItems + otherPagesItems;
    const itemsInPage = page == 0 ? ITEMS_IN_FIRST_PAGE_PREVIEW_CARD : ITEMS_IN_PREVIEW_CARD;
    return items?.length > firstShownItem ? items.slice(firstShownItem, firstShownItem + itemsInPage) : [];
  }, [items, count, page]);

  const loadMoreIfNeeded = (): void => {
    const firstPageItems = page > 0 ? ITEMS_IN_FIRST_PAGE_PREVIEW_CARD : 0;
    const otherPagesItems = page > 1 ? ITEMS_IN_PREVIEW_CARD * (page - 1) : 0;
    const firstShownItem = firstPageItems + otherPagesItems;
    if (items.length < count && items.length < firstShownItem + ITEMS_IN_PREVIEW_CARD) {
      loadMoreItems(group.id, items.length, ITEMS_IN_PREVIEW_CARD * 2);
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
      <GroupPreviewCardFooter page={page} totalPages={totalPages} setPage={setPage} itemsCount={count} />
    </>
  );
};

export default memo(GroupPreviewCardBody);
