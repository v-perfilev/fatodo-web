import * as React from 'react';
import {FC, useEffect, useMemo, useState} from 'react';
import {useSnackContext} from '../../../shared/contexts/snack-context';
import {useGroupViewContext} from '../../../shared/contexts/view-contexts/group-view-context';
import {useItemListContext} from '../../../shared/contexts/list-contexts/item-list-context';
import {BUTTONS_IN_GROUP_CARD, ITEMS_IN_GROUP_CARD} from '../_constants';
import ItemService from '../../../services/item.service';
import GroupPreviewCardFooter from './group-preview-card-footer';
import GroupPreviewCardContent from './group-preview-card-content';
import {flowRight} from 'lodash';
import withItemList from '../../../shared/hocs/with-list/with-item-list';
import {Item} from '../../../models/item.model';

const GroupPreviewCardBody: FC = () => {
  const {handleResponse} = useSnackContext();
  const {obj: group} = useGroupViewContext();
  const {objs: items, setObjs: setItems, setLoad: setLoadItems} = useItemListContext();
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

  const loadItems = (): void => {
    ItemService.getAllItemsByGroupId(group.id)
      .then((response) => {
        setItems(response.data);
      })
      .catch((response) => {
        handleResponse(response);
      });
  };

  useEffect(() => {
    setLoadItems(() => (): void => loadItems());
  }, []);

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

export default flowRight([withItemList])(GroupPreviewCardBody);
