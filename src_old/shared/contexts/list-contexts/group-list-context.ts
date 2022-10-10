import * as React from 'react';
import {useContext} from 'react';
import {Group} from '../../../models/group.model';

type GroupListState = {
  groups: Group[];
  setGroups: (groups: Group[]) => void;
  load: () => void;
  loading: boolean;
};

export const GroupListContext = React.createContext<GroupListState>(null);
export const useGroupListContext = (): GroupListState => useContext(GroupListContext);
