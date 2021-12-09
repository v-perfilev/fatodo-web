import * as React from 'react';
import {ComponentType, FC, ReactElement, useState} from 'react';
import {useSnackContext} from '../../contexts/snack-context';
import {PreviewItemListContext} from '../../contexts/list-contexts/preview-item-list-context';
import {Item} from '../../../models/item.model';
import {PageableList} from '../../../models/pageable-list.model';
import {ArrayUtils} from '../../utils/array.utils';
import ItemService from '../../../services/item.service';

const withPreviewItemList = (Component: ComponentType): FC => (props): ReactElement => {
  const {handleResponse} = useSnackContext();
  const [items, setItems] = useState<Map<string, Item[]>>(new Map());
  const [counts, setCounts] = useState<Map<string, number>>(new Map());
  const [loading, setLoading] = useState<Map<string, boolean>>(new Map());

  const filterItems = (items: Item[]): Item[] =>
    items.filter(ArrayUtils.withIdFilter).filter(ArrayUtils.uniqueByIdFilter).sort(ArrayUtils.createdAtDescComparator);

  const updateItems = (itemMap: Map<string, PageableList<Item>>): void => {
    setItems((prevState) => {
      itemMap.forEach((newItems, groupId) => {
        const prevItems = prevState.has(groupId) ? prevState.get(groupId) : [];
        const combinedItems = [...prevItems, ...newItems.data];
        const filteredItems = filterItems(combinedItems);
        prevState.set(groupId, filteredItems);
      });
      return new Map(prevState);
    });
    setCounts((prevState) => {
      itemMap.forEach((newItems, groupId) => {
        prevState.set(groupId, newItems.count);
      });
      return new Map(prevState);
    });
  };

  const setIdsLoading = (groupIds: string[], value: boolean): void => {
    setLoading((prevState) => {
      groupIds.forEach((groupId) => prevState.set(groupId, value));
      return new Map(prevState);
    });
  };

  const loadInitialState = (groupIds: string[]): void => {
    setIdsLoading(groupIds, true);
    ItemService.getPreviewItemsByGroupIds(groupIds)
      .then((response) => {
        const itemMap = new Map(Object.entries(response.data));
        updateItems(itemMap);
      })
      .catch((response) => {
        handleResponse(response);
      })
      .finally(() => {
        setIdsLoading(groupIds, false);
      });
  };

  const loadMore = (groupId: string, offset: number, size: number): void => {
    setIdsLoading([groupId], true);
    ItemService.getItemsByGroupId(groupId, offset, size)
      .then((response) => {
        const itemMap = new Map([[groupId, response.data]]);
        updateItems(itemMap);
      })
      .catch((response) => {
        handleResponse(response);
      })
      .finally(() => {
        setIdsLoading([groupId], false);
      });
  };

  const context = {items, counts, loadInitialState, loadMore, loading};

  return (
    <PreviewItemListContext.Provider value={context}>
      <Component {...props} />
    </PreviewItemListContext.Provider>
  );
};

export default withPreviewItemList;
