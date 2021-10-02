import * as React from 'react';
import {ComponentType, FC, ReactElement, useCallback, useEffect} from 'react';
import {useDialogContext} from '../../contexts/dialog-contexts/dialog-context';
import {Group, GroupUser} from '../../../models/group.model';
import {
  defaultGroupDeleteDialogProps,
  GroupDeleteDialog,
  GroupDeleteDialogProps,
} from '../../../pages/group/dialogs/group-delete-dialog';
import {GroupDialogContext} from '../../contexts/dialog-contexts/group-dialog-context';
import {User} from '../../../models/user.model';
import GroupAddMembersDialog, {
  defaultGroupAddMembersDialogProps,
  GroupAddMembersDialogProps,
} from '../../../pages/group/dialogs/group-add-members-dialog';
import GroupMembersDialog, {
  defaultGroupMembersDialogProps,
  GroupMembersDialogProps,
} from '../../../pages/group/dialogs/group-members-dialog';
import GroupEditMemberDialog, {
  defaultGroupEditMemberDialogProps,
  GroupEditMemberDialogProps,
} from '../../../pages/group/dialogs/group-edit-member-dialog';

enum GroupDialogs {
  DELETE = 'GROUP_DELETE_DIALOG',
  ADD_MEMBERS = 'GROUP_ADD_MEMBERS_DIALOG',
  EDIT_MEMBER = 'GROUP_EDIT_MEMBER_DIALOG',
  MEMBERS = 'GROUP_MEMBERS_DIALOG',
}

const withGroupDialogs = (Component: ComponentType): FC => (props): ReactElement => {
  const {handleDialog, setDialogProps, updateDialogProps, clearDialogProps} = useDialogContext();

  const showGroupDeleteDialog = useCallback(
    (group: Group, onSuccess?: () => void): void => {
      const show = true;
      const close = (): void => clearDialogProps(GroupDialogs.DELETE);
      const props = {group, show, close, onSuccess} as GroupDeleteDialogProps;
      setDialogProps(GroupDialogs.DELETE, props);
    },
    [setDialogProps, clearDialogProps]
  );

  const showGroupAddMembersDialog = useCallback(
    (group: Group): void => {
      const show = true;
      const close = (): void => updateDialogProps(GroupDialogs.ADD_MEMBERS, {show: false});
      const props = {group, show, close} as GroupAddMembersDialogProps;
      setDialogProps(GroupDialogs.ADD_MEMBERS, props);
    },
    [setDialogProps, updateDialogProps]
  );

  const showGroupEditMemberDialog = useCallback(
    (group: Group, user: GroupUser): void => {
      const show = true;
      const close = (): void => updateDialogProps(GroupDialogs.EDIT_MEMBER, {show: false});
      const props = {group, user, show, close} as GroupEditMemberDialogProps;
      setDialogProps(GroupDialogs.EDIT_MEMBER, props);
    },
    [setDialogProps, updateDialogProps]
  );

  const showGroupMembersDialog = useCallback(
    (group: Group, users: User[]): void => {
      const show = true;
      const close = (): void => updateDialogProps(GroupDialogs.MEMBERS, {show: false});
      const switchToAddMembers = (): void => {
        updateDialogProps(GroupDialogs.MEMBERS, {show: false});
        showGroupAddMembersDialog(group);
      };
      const switchToEditMember = (user: GroupUser): void => {
        updateDialogProps(GroupDialogs.MEMBERS, {show: false});
        showGroupEditMemberDialog(group, user);
      };
      const props = {group, users, show, close, switchToAddMembers, switchToEditMember} as GroupMembersDialogProps;
      setDialogProps(GroupDialogs.MEMBERS, props);
    },
    [setDialogProps, updateDialogProps, showGroupAddMembersDialog]
  );

  const initDialogs = (): void => {
    handleDialog(GroupDialogs.DELETE, GroupDeleteDialog, defaultGroupDeleteDialogProps);
    handleDialog(GroupDialogs.ADD_MEMBERS, GroupAddMembersDialog, defaultGroupAddMembersDialogProps);
    handleDialog(GroupDialogs.EDIT_MEMBER, GroupEditMemberDialog, defaultGroupEditMemberDialogProps);
    handleDialog(GroupDialogs.MEMBERS, GroupMembersDialog, defaultGroupMembersDialogProps);
  };

  useEffect(() => {
    initDialogs();
  }, []);

  const context = {
    showGroupDeleteDialog,
    showGroupAddMembersDialog,
    showGroupEditMemberDialog,
    showGroupMembersDialog,
  };

  return (
    <GroupDialogContext.Provider value={context}>
      <Component {...props} />
    </GroupDialogContext.Provider>
  );
};

export default withGroupDialogs;
