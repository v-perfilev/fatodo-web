import React, {FC, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import ModalDialog from '../../../../components/dialogs/modal-dialog/modal-dialog';
import {Button} from '@material-ui/core';
import {useSnackContext} from '../../../../shared/contexts/snack-context';
import {LoadingButton} from '../../../../components/controls';
import {Group, GroupMember, GroupPermission, GroupUser} from '../../../../models/group.model';
import ItemService from '../../../../services/item.service';
import {UserView} from '../../../../components/views';
import {PermissionSelect} from '../../../../components/inputs/permission-select';

export type GroupEditMemberDialogProps = {
  group: Group;
  user: GroupUser;
  show: boolean;
  close: () => void;
  onSuccess: () => void;
};

export const defaultGroupEditMemberDialogProps: Readonly<GroupEditMemberDialogProps> = {
  group: null,
  user: null,
  show: false,
  close: (): void => undefined,
  onSuccess: (): void => undefined,
};

type Props = GroupEditMemberDialogProps;

const GroupEditMemberDialog: FC<Props> = ({group, user, show, close, onSuccess}: Props) => {
  const {handleResponse} = useSnackContext();
  const {t} = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [permission, setPermission] = useState<GroupPermission>();

  const editMember = (): void => {
    setIsSubmitting(true);
    const editedMember = {id: user.id, permission} as GroupMember;
    ItemService.editGroupMember(group.id, editedMember)
      .then(() => {
        close();
        onSuccess();
      })
      .catch((response) => {
        handleResponse(response);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  useEffect(() => {
    if (group && user) {
      setPermission(user.permission);
    }
  }, [group, user]);

  const content = group && user && (
    <>
      <UserView user={user} withUsername />
      <PermissionSelect permission={permission} setPermission={setPermission} />
    </>
  );

  const cancelButton = (
    <Button onClick={close} color="primary" disabled={isSubmitting}>
      {t('group:editMember.buttons.cancel')}
    </Button>
  );

  const sendButton = (
    <LoadingButton color="secondary" disabled={isSubmitting} loading={isSubmitting} onClick={editMember}>
      {t('group:editMember.buttons.send')}
    </LoadingButton>
  );

  const actions = (
    <>
      {cancelButton}
      {sendButton}
    </>
  );

  return (
    <ModalDialog
      isOpen={show}
      close={close}
      title={t('group:editMember.title')}
      content={content}
      actions={actions}
      showCloseIcon
    />
  );
};

export default GroupEditMemberDialog;
