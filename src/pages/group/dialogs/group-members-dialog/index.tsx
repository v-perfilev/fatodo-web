import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import ModalDialog from '../../../../components/dialogs/modal-dialog';
import {User} from '../../../../models/user.model';
import {Box, Button} from '@material-ui/core';
import {ClearableTextInput} from '../../../../components/inputs';
import {groupMembersDialogStyles} from './_styles';
import GroupMembersDialogMember from './group-members-dialog-member';
import {UserPlusIcon} from '../../../../components/icons/user-plus-icon';
import {Group, GroupUser} from '../../../../models/group.model';
import withAuthState from '../../../../shared/hocs/with-auth-state/with-auth-state';
import {AuthState} from '../../../../store/rerducers/auth.reducer';
import {GroupUtils} from '../../../../shared/utils/group.utils';

export type GroupMembersDialogProps = {
  group: Group;
  users: User[];
  show: boolean;
  close: () => void;
  onSuccess: () => void;
  switchToAddMembers: () => void;
  switchToEditMember: (user: GroupUser) => void;
};

export const defaultGroupMembersDialogProps: Readonly<GroupMembersDialogProps> = {
  group: null,
  users: [],
  show: false,
  onSuccess: (): void => undefined,
  close: (): void => undefined,
  switchToAddMembers: (): void => undefined,
  switchToEditMember: (): void => undefined,
};

type Props = AuthState & GroupMembersDialogProps;

const GroupMembersDialog: FC<Props> = (props: Props) => {
  const {group, users, show, close, onSuccess, switchToAddMembers, switchToEditMember, account} = props;
  const classes = groupMembersDialogStyles();
  const {t} = useTranslation();
  const [usersToShow, setUsersToShow] = useState<GroupUser[]>([]);
  const [deletedMemberIds, setDeletedMemberIds] = useState<string[]>([]);

  const canAdmin = group && GroupUtils.canAdmin(account, group);

  const conditionalClose = (): void => {
    if (deletedMemberIds.length >= 0) {
      onSuccess();
    }
    close();
  };

  const updateUsersToShow = (filter?: string): void => {
    const memberMap = new Map(group.members.map((member) => [member.id, member]));
    const updatedUsersToShow = users
      .filter((user) => !deletedMemberIds.includes(user.id))
      .filter((user) => memberMap.has(user.id))
      .map((user) => ({...user, ...memberMap.get(user.id)}))
      .filter((user) => filter === undefined || user.username.includes(filter));
    setUsersToShow(updatedUsersToShow);
  };

  const filterUsersToShow = (event: ChangeEvent<HTMLInputElement>): void => {
    const filter = event.target.value;
    updateUsersToShow(filter);
  };

  const onMemberDelete = (userId: string): void => {
    setDeletedMemberIds((prevState) => [...prevState, userId]);
  };

  useEffect(() => {
    if (group) {
      updateUsersToShow();
    }
  }, [group, deletedMemberIds]);

  const filter = (
    <Box className={classes.filter}>
      <ClearableTextInput placeholder={t('inputs.filter')} onChange={filterUsersToShow} fullWidth />
    </Box>
  );

  const userList = (
    <Box className={classes.users}>
      {usersToShow.map((user, index) => (
        <GroupMembersDialogMember
          group={group}
          user={user}
          key={index}
          switchToEditMember={switchToEditMember}
          onDelete={onMemberDelete}
        />
      ))}
      {usersToShow.length === 0 && <Box className={classes.notFound}>{t('group:members.usersNotFound')}</Box>}
    </Box>
  );

  const content = (
    <>
      {filter}
      {userList}
    </>
  );

  const actions = group && canAdmin && (
    <Button startIcon={<UserPlusIcon />} onClick={switchToAddMembers} color="primary">
      {t('group:members.buttons.addUsers')}
    </Button>
  );

  return (
    <ModalDialog
      isOpen={show}
      close={conditionalClose}
      title={t('group:members.title')}
      content={content}
      actions={actions}
      showCloseIcon
      size="md"
    />
  );
};

export default withAuthState(GroupMembersDialog);
