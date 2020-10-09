import * as React from 'react';
import {useContext} from 'react';
import {Group} from '../../models/group.model';

interface GroupListState {
  groups: Group[];
  setGroups: (groups: Group[]) => void;
  loadGroups: () => void;
  setLoadGroups: (loadGroups: () => void) => void;
}

export const GroupListContext = React.createContext<GroupListState>(null);
export const GroupListProvider = GroupListContext.Provider;
export const useGroupListContext = (): GroupListState => useContext(GroupListContext);
