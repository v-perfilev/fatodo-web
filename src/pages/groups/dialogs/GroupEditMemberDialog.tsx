import React, {FC, memo, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Group, GroupMember, GroupPermission, GroupUser} from '../../../models/Group';
import UserView from '../../../components/views/UserView';
import ModalDialog from '../../../components/modals/ModalDialog';
import FVStack from '../../../components/boxes/FVStack';
import {useAppDispatch} from '../../../store/store';
import {GroupActions} from '../../../store/group/groupActions';
import {Button} from '@mui/material';
import LoadingButton from '../../../components/controls/LoadingButton';
import PermissionSelect from '../../../components/inputs/permissionSelect/PermissionSelect';

export type GroupEditMemberDialogProps = {
  group: Group;
  user: GroupUser;
  show: boolean;
  close: () => void;
};

export const defaultGroupEditMemberDialogProps: Readonly<GroupEditMemberDialogProps> = {
  group: null,
  user: null,
  show: false,
  close: (): void => null,
};

type Props = GroupEditMemberDialogProps;

const GroupEditMemberDialog: FC<Props> = ({group, user, show, close}: Props) => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [permission, setPermission] = useState<GroupPermission>();

  const editMember = (): void => {
    setIsSubmitting(true);
    const editedMember: GroupMember = {groupId: group.id, userId: user.userId, permission};
    dispatch(GroupActions.editGroupMemberThunk({group, member: editedMember}))
      .unwrap()
      .then(() => close())
      .finally(() => setIsSubmitting(false));
  };

  useEffect(() => {
    if (group && user) {
      setPermission(user.permission);
    }
  }, [group, user]);

  const content = group && user && (
    <FVStack>
      <UserView user={user} withUsername />
      <PermissionSelect permission={permission} setPermission={setPermission} />
    </FVStack>
  );

  const actions = (
    <>
      <Button variant="text" color="secondary" disabled={isSubmitting} onClick={close}>
        {t('group:editMember.buttons.cancel')}
      </Button>
      <LoadingButton color="primary" disabled={isSubmitting} loading={isSubmitting} onClick={editMember}>
        {t('group:editMember.buttons.send')}
      </LoadingButton>
    </>
  );

  return (
    <ModalDialog open={show} close={close} title={t('group:editMember.title')} content={content} actions={actions} />
  );
};

export default memo(GroupEditMemberDialog);
