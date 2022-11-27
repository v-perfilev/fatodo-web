import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Group, GroupUser} from '../../../../models/Group';
import {GroupUtils} from '../../../../shared/utils/GroupUtils';
import ClearableTextInput from '../../../../components/inputs/ClearableTextInput';
import UserPlusIcon from '../../../../components/icons/UserPlusIcon';
import ModalDialog from '../../../../components/modals/ModalDialog';
import GroupMembersDialogMember from './GroupMembersDialogMember';
import FVStack from '../../../../components/boxes/FVStack';
import FCenter from '../../../../components/boxes/FCenter';
import {useAppSelector} from '../../../../store/store';
import AuthSelectors from '../../../../store/auth/authSelectors';
import InfoSelectors from '../../../../store/info/infoSelectors';
import {Button, Typography} from '@mui/material';

export type GroupMembersDialogProps = {
  group: Group;
  show: boolean;
  close: () => void;
  switchToAddMembers: () => void;
  switchToEditMember: (user: GroupUser) => void;
};

export const defaultGroupMembersDialogProps: Readonly<GroupMembersDialogProps> = {
  group: null,
  show: false,
  close: (): void => null,
  switchToAddMembers: (): void => null,
  switchToEditMember: (): void => null,
};

const GroupMembersDialog = ({group, show, close, switchToAddMembers, switchToEditMember}: GroupMembersDialogProps) => {
  const usersSelector = useCallback(InfoSelectors.makeUsersSelector(), []);
  const memberIds = useMemo(() => group?.members.map((m) => m.userId), [group]);
  const account = useAppSelector(AuthSelectors.account);
  const users = useAppSelector((state) => usersSelector(state, memberIds));
  const {t} = useTranslation();
  const [usersToShow, setUsersToShow] = useState<GroupUser[]>([]);
  const [deletedMemberIds, setDeletedMemberIds] = useState<string[]>([]);

  const canAdmin = group && GroupUtils.canAdmin(account, group);

  const conditionalClose = (): void => {
    if (deletedMemberIds.length >= 0) {
      setTimeout(() => setDeletedMemberIds([]), 1000);
    }
    close();
  };

  const updateUsersToShow = (filter?: string): void => {
    const memberMap = new Map(group.members.map((member) => [member.userId, member]));
    const updatedUsersToShow = users
      .filter((user) => !deletedMemberIds.includes(user.id))
      .filter((user) => filter === undefined || user.username.includes(filter))
      .map((user) => ({...user, ...memberMap.get(user.id)}));
    setUsersToShow(updatedUsersToShow);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    updateUsersToShow(value);
  };

  const onMemberDelete = (userId: string): void => {
    setDeletedMemberIds((prevState) => [...prevState, userId]);
  };

  useEffect(() => {
    if (group) {
      updateUsersToShow();
    }
  }, [group, deletedMemberIds]);

  const content = (
    <FVStack>
      <ClearableTextInput placeholder={t('inputs.filter')} onChange={handleChange} />
      {usersToShow.length > 0 && (
        <FVStack>
          {usersToShow.map((user) => (
            <GroupMembersDialogMember
              group={group}
              user={user}
              switchToEditMember={switchToEditMember}
              onDelete={onMemberDelete}
              key={user.userId}
            />
          ))}
        </FVStack>
      )}
      {usersToShow.length === 0 && (
        <FCenter>
          <Typography fontSize={14} color="grey.400">
            {t('group:members.usersNotFound')}
          </Typography>
        </FCenter>
      )}
    </FVStack>
  );

  const actions = group && canAdmin && (
    <Button variant="text" startIcon={<UserPlusIcon />} color="primary" onClick={switchToAddMembers}>
      {t('group:members.buttons.addUsers')}
    </Button>
  );

  return (
    <ModalDialog
      open={show}
      close={conditionalClose}
      title={t('group:members.title')}
      content={content}
      actions={actions}
    />
  );
};

export default memo(GroupMembersDialog);
