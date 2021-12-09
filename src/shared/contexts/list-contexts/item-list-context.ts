import * as React from 'react';
import {useContext} from 'react';
import {Item} from '../../../models/item.model';

type ItemListState = {
  items: Item[];
  count: number;
  addItem: (item: Item) => void;
  updateItem: (item: Item) => void;
  removeItem: (itemId: string) => void;
  load: (groupId: string, offset?: number, size?: number) => void;
  loading: boolean;
};

export const ItemListContext = React.createContext<ItemListState>(null);
export const useItemListContext = (): ItemListState => useContext(ItemListContext);
