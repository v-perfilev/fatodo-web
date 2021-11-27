import * as React from 'react';
import {FC, useMemo, useState} from 'react';
import {useItemListContext} from '../../../shared/contexts/list-contexts/item-list-context';
import {BUTTONS_IN_GROUP_CARD, ITEMS_IN_GROUP_CARD} from '../_constants';
import GroupPreviewCardFooter from './group-preview-card-footer';
import GroupPreviewCardContent from './group-preview-card-content';
import {Item} from '../../../models/item.model';

const GroupPreviewCardBody: FC = () => {
  const {objs: items} = useItemListContext();
  const [firstShownItem, setFirstShownItem] = useState(0);

  const isMultiPage = items.length + BUTTONS_IN_GROUP_CARD > ITEMS_IN_GROUP_CARD;
  const isNotFirstPage = firstShownItem > 0;
  const isNotLastPage = firstShownItem + ITEMS_IN_GROUP_CARD < items.length + BUTTONS_IN_GROUP_CARD;
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
      />
    </>
  );
};

export default GroupPreviewCardBody;
