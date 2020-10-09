import * as React from 'react';
import {useContext} from 'react';
import {Group} from '../../models/group.model';

interface GroupViewState {
  group: Group;
  setGroup: (group: Group) => void;
}

export const GroupViewContext = React.createContext<GroupViewState>(null);
export const GroupViewProvider = GroupViewContext.Provider;
export const useGroupViewContext = (): GroupViewState => useContext(GroupViewContext);
