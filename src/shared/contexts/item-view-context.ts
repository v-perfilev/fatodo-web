import * as React from 'react';
import {useContext} from 'react';
import {Item} from '../../models/item.model';

interface ItemViewState {
  item: Item;
  setItem: (item: Item) => void;
}

export const ItemViewContext = React.createContext<ItemViewState>(null);
export const ItemViewProvider = ItemViewContext.Provider;
export const useItemViewContext = (): ItemViewState => useContext(ItemViewContext);
