import * as React from 'react';
import {FC, memo, useMemo, useState} from 'react';
import {BUTTONS_IN_GROUP_CARD, ITEMS_IN_GROUP_CARD} from '../_constants';
import GroupPreviewCardFooter from './group-preview-card-footer';
import GroupPreviewCardContent from './group-preview-card-content';
import {Item} from '../../../models/item.model';
import {usePreviewItemListContext} from '../../../shared/contexts/list-contexts/preview-item-list-context';
import {useGroupViewContext} from '../../../shared/contexts/view-contexts/group-view-context';

const GroupPreviewCardBody: FC = () => {
  const {group} = useGroupViewContext();
  const {items: previewItems, counts: previewCounts, loadMore: loadMoreItems} = usePreviewItemListContext();
  const [firstShownItem, setFirstShownItem] = useState(0);

  const items = useMemo<Item[]>(() => {
    return group && previewItems.has(group.id) ? previewItems.get(group.id) : [];
  }, [group, previewItems]);

  const count = useMemo<number>(() => {
    return group && previewCounts.has(group.id) ? previewCounts.get(group.id) : 0;
  }, [group, previewCounts]);

  const isMultiPage = count + BUTTONS_IN_GROUP_CARD > ITEMS_IN_GROUP_CARD;
  const isNotFirstPage = firstShownItem > 0;
  const isNotLastPage = firstShownItem + ITEMS_IN_GROUP_CARD < count + BUTTONS_IN_GROUP_CARD;
  const itemsInPage = isNotFirstPage ? ITEMS_IN_GROUP_CARD : ITEMS_IN_GROUP_CARD - BUTTONS_IN_GROUP_CARD;

  const itemsToShow = useMemo<Item[]>(() => items.slice(firstShownItem, firstShownItem + itemsInPage), [
    items,
    firstShownItem,
    itemsInPage,
  ]);

  const onUpClick = (): void => {
    setFirstShownItem((prevState) => {
      return prevState > ITEMS_IN_GROUP_CARD - BUTTONS_IN_GROUP_CARD ? prevState - ITEMS_IN_GROUP_CARD : 0;
    });
  };
  const onDownClick = (): void => {
    if (items.length < count && firstShownItem + ITEMS_IN_GROUP_CARD) {
      loadMoreItems(group.id, items.length, 2 * ITEMS_IN_GROUP_CARD);
    }
    setFirstShownItem((prevState) => {
      return prevState === 0
        ? prevState + ITEMS_IN_GROUP_CARD - BUTTONS_IN_GROUP_CARD
        : prevState + ITEMS_IN_GROUP_CARD;
    });
  };

  return (
    <>
      <GroupPreviewCardContent itemsToShow={itemsToShow} isNotFirstPage={isNotFirstPage} />
      <GroupPreviewCardFooter
        onUpClick={onUpClick}
        onDownClick={onDownClick}
        isMultiPage={isMultiPage}
        isNotFirstPage={isNotFirstPage}
        isNotLastPage={isNotLastPage}
        firstShownItem={firstShownItem}
        count={count}
      />
    </>
  );
};

export default memo(GroupPreviewCardBody);
