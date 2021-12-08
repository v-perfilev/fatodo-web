import * as React from 'react';
import {ComponentType, FC, ReactElement, useState} from 'react';
import {useSnackContext} from '../../contexts/snack-context';
import ItemService from '../../../services/item.service';
import {Item} from '../../../models/item.model';
import {ArrayUtils} from '../../utils/array.utils';
import {ArchivedItemListContext} from '../../contexts/list-contexts/archived-item-list-context';

const withItemList = (Component: ComponentType): FC => (props): ReactElement => {
  const {handleResponse} = useSnackContext();
  const [items, setItems] = useState<Item[]>([]);
  const [count, setCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const filterItems = (items: Item[]): Item[] =>
    items.filter(ArrayUtils.withIdFilter).filter(ArrayUtils.uniqueByIdFilter).sort(ArrayUtils.createdAtDescComparator);

  const load = (groupId: string, offset?: number, size?: number): void => {
    setLoading(true);
    ItemService.getArchivedItemsByGroupId(groupId, offset, size)
      .then((response) => {
        setItems((prevState) => {
          const combinedItems = [...prevState, ...response.data.data];
          return filterItems(combinedItems);
        });
        setCount(response.data.count);
      })
      .catch((response) => {
        handleResponse(response);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const context = {items, count, load, loading};

  return (
    <ArchivedItemListContext.Provider value={context}>
      <Component {...props} />
    </ArchivedItemListContext.Provider>
  );
};

export default withItemList;