import * as React from 'react';
import {useContext} from 'react';
import {Group} from '../../models/group.model';

interface GroupDeleteState {
  setGroupToDelete: (group: Group) => void;
  setOnDeleteGroupSuccess: (onSuccess: () => void) => void;
}

export const GroupDeleteContext = React.createContext<GroupDeleteState>(null);
export const useGroupDeleteContext = (): GroupDeleteState => useContext(GroupDeleteContext);
