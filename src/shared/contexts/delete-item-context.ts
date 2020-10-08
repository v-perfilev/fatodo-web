import * as React from 'react';
import {useContext} from 'react';
import {Item} from '../../models/item.model';

interface DeleteItemState {
  setItemToDelete: (item: Item) => void;
  setOnDeleteItemSuccess: (onSuccess: () => void) => void;
}

export const DeleteItemContext = React.createContext<DeleteItemState>(null);
export const DeleteItemProvider = DeleteItemContext.Provider;
export const useDeleteItemContext = (): DeleteItemState => useContext(DeleteItemContext);
