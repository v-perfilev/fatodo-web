import * as React from 'react';
import {useContext} from 'react';
import {Item} from '../../models/item.model';

interface ItemListState {
  items: Item[];
  setItems: (items: Item[]) => void;
  loadItems: () => void;
  setLoadItems: (loadItems: () => void) => void;
}

export const ItemListContext = React.createContext<ItemListState>(null);
export const useItemListContext = (): ItemListState => useContext(ItemListContext);
