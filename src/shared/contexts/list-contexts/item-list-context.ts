import * as React from 'react';
import {useContext} from 'react';
import {Item} from '../../../models/item.model';

type ItemListState = {
  items: Item[];
  count: number;
  load: (groupId: string) => void;
  loading: boolean;
};

export const ItemListContext = React.createContext<ItemListState>(null);
export const useItemListContext = (): ItemListState => useContext(ItemListContext);
