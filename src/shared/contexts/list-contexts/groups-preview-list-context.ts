import * as React from 'react';
import {useContext} from 'react';
import {Item} from '../../../models/item.model';

export interface GroupsPreviewListState {
  items: Map<string, Item[]>;
  counts: Map<string, number>;
  loadInitialState: (groupIds: string[]) => void;
  loadMore: (groupId: string, offset: number, size: number) => void;
  loading: Map<string, boolean>;
  expanded: Map<string, boolean>;
  setExpanded: (groupIds: string[], value: boolean) => void;
}

export const GroupsPreviewListContext = React.createContext<GroupsPreviewListState>(null);
export const useGroupsPreviewListContext = (): GroupsPreviewListState => useContext(GroupsPreviewListContext);
