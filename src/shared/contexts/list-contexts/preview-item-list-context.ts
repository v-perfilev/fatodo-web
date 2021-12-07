import * as React from 'react';
import {useContext} from 'react';
import {Item} from '../../../models/item.model';

export interface PreviewItemListState {
  items: Map<string, Item[]>;
  counts: Map<string, number>;
  loadInitialState: (groupIds: string[]) => void;
  loadMore: (groupId: string, offset: number, size: number) => void;
  loading: Map<string, boolean>;
}

export const PreviewItemListContext = React.createContext<PreviewItemListState>(null);
export const usePreviewItemListContext = (): PreviewItemListState => useContext(PreviewItemListContext);
