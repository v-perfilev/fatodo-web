import * as React from 'react';
import {useContext} from 'react';
import {Group, GroupUser} from '../../../models/group.model';
import {User} from '../../../models/user.model';

interface GroupDialogState {
  showGroupDeleteDialog: (group: Group, onSuccess?: () => void) => void;
  showGroupAddMembersDialog: (group: Group) => void;
  showGroupEditMemberDialog: (group: Group, user: GroupUser) => void;
  showGroupMembersDialog: (group: Group, users: User[]) => void;
}

export const GroupDialogContext = React.createContext<GroupDialogState>(null);
export const useGroupDialogContext = (): GroupDialogState => useContext(GroupDialogContext);
