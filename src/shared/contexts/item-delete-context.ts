import * as React from 'react';
import {useContext} from 'react';
import {Item} from '../../models/item.model';

interface ItemDeleteState {
  setItemToDelete: (item: Item) => void;
  setOnDeleteItemSuccess: (onSuccess: () => void) => void;
}

export const ItemDeleteContext = React.createContext<ItemDeleteState>(null);
export const ItemDeleteProvider = ItemDeleteContext.Provider;
export const useItemDeleteContext = (): ItemDeleteState => useContext(ItemDeleteContext);
