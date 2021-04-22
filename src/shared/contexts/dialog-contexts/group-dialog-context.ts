import * as React from 'react';
import {useContext} from 'react';
import {Group} from '../../../models/group.model';

interface GroupDialogState {
  showGroupDeleteDialog: (group: Group, onSuccess?: () => void) => void;
}

export const GroupDialogContext = React.createContext<GroupDialogState>(null);
export const useGroupDialogContext = (): GroupDialogState => useContext(GroupDialogContext);
