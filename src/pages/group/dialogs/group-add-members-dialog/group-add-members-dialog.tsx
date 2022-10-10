import React, {FC, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import ModalDialog from '../../../../components/dialogs/ModalDialog';
import {Button} from '@material-ui/core';
import {useSnackContext} from '../../../../shared/contexts/snack-context';
import {LoadingButton} from '../../../../components/controls';
import UsersSelect from '../../../../components/inputs/usersSelect/UsersSelect';
import {Group} from '../../../../models/group.model';
import ItemService from '../../../../services/item.service';
import {useContactContext} from '../../../../shared/contexts/contact-contexts/contact-context';

export type GroupAddMembersDialogProps = {
  group: Group;
  show: boolean;
  close: () => void;
  onSuccess: () => void;
};

export const defaultGroupAddMembersDialogProps: Readonly<GroupAddMembersDialogProps> = {
  group: null,
  show: false,
  close: (): void => undefined,
  onSuccess: (): void => undefined,
};

type Props = GroupAddMembersDialogProps;

const GroupAddMembersDialog: FC<Props> = ({group, show, close, onSuccess}: Props) => {
  const {handleResponse} = useSnackContext();
  const {t} = useTranslation();
  const {relations, update} = useContactContext();
  const [contactIds, setContactIds] = useState<string[]>([]);
  const [userIds, setUserIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addUsers = (): void => {
    setIsSubmitting(true);
    ItemService.addMembersToGroup(group.id, userIds)
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
    if (show && update) {
      update();
    }
  }, [show]);

  useEffect(() => {
    const relationUserIds = relations.map((relation) => relation.secondUserId);
    setContactIds(relationUserIds);
  }, [show, relations]);

  const isUserIdListEmpty = userIds.length == 0;
  const ignoredIds = group?.members.map((m) => m.id);

  const content = group && <UsersSelect allowedIds={contactIds} ignoredIds={ignoredIds} setUserIds={setUserIds} />;

  const cancelButton = (
    <Button onClick={close} color="primary" disabled={isSubmitting}>
      {t('group:addMembers.buttons.cancel')}
    </Button>
  );

  const sendButton = (
    <LoadingButton
      color="secondary"
      disabled={isSubmitting || isUserIdListEmpty}
      loading={isSubmitting}
      onClick={addUsers}
    >
      {t('group:addMembers.buttons.send')}
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
      title={t('group:addMembers.title')}
      content={content}
      actions={actions}
      showCloseIcon
    />
  );
};

export default GroupAddMembersDialog;
