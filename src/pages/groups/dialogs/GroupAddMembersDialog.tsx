import React, {memo, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import ModalDialog from '../../../components/modals/ModalDialog';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ContactsSelectors from '../../../store/contacts/contactsSelectors';
import {Group} from '../../../models/Group';
import {GroupActions} from '../../../store/group/groupActions';
import {ContactsActions} from '../../../store/contacts/contactsActions';
import {Button} from '@mui/material';
import LoadingButton from '../../../components/controls/LoadingButton';
import UsersSelect from '../../../components/inputs/userSelect/UsersSelect';

export type GroupAddMembersDialogProps = {
  group: Group;
  show: boolean;
  close: () => void;
};

export const defaultGroupAddMembersDialogProps: Readonly<GroupAddMembersDialogProps> = {
  group: null,
  show: false,
  close: (): void => null,
};

const GroupAddMembersDialog = ({group, show, close}: GroupAddMembersDialogProps) => {
  const dispatch = useAppDispatch();
  const relations = useAppSelector(ContactsSelectors.relations);
  const {t} = useTranslation();
  const [contactIds, setContactIds] = useState<string[]>([]);
  const [userIds, setUserIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addUsers = (): void => {
    setIsSubmitting(true);
    dispatch(GroupActions.addGroupMembersThunk({group, userIds}))
      .unwrap()
      .then(() => close())
      .finally(() => setIsSubmitting(false));
  };

  useEffect(() => {
    if (show) {
      dispatch(ContactsActions.fetchRelationsThunk());
    }
  }, [show]);

  useEffect(() => {
    const relationUserIds = relations.map((relation) => relation.secondUserId);
    const ignoredIds = group?.members.map((m) => m.userId);
    const contactIds = relationUserIds.filter((id) => !ignoredIds || !ignoredIds.includes(id));
    setContactIds(contactIds);
  }, [relations, show]);

  const isUserIdListEmpty = userIds.length === 0;

  const content = group && <UsersSelect contactIds={contactIds} setUserIds={setUserIds} />;

  const actions = (
    <>
      <Button variant="text" color="secondary" disabled={isSubmitting} onClick={close}>
        {t('group:addMembers.buttons.cancel')}
      </Button>
      <LoadingButton
        variant="text"
        color="primary"
        disabled={isSubmitting || isUserIdListEmpty}
        loading={isSubmitting}
        onClick={addUsers}
      >
        {t('group:addMembers.buttons.send')}
      </LoadingButton>
    </>
  );

  return (
    <ModalDialog open={show} close={close} title={t('group:addMembers.title')} content={content} actions={actions} />
  );
};

export default memo(GroupAddMembersDialog);
