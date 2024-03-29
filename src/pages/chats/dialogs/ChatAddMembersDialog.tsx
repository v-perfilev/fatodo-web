import React, {memo, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import ModalDialog from '../../../components/modals/ModalDialog';
import UsersSelect from '../../../components/inputs/userSelect/UsersSelect';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import ContactsSelectors from '../../../store/contacts/contactsSelectors';
import {Chat} from '../../../models/Chat';
import {ChatActions} from '../../../store/chat/chatActions';
import {ContactsActions} from '../../../store/contacts/contactsActions';
import {Button} from '@mui/material';
import LoadingButton from '../../../components/controls/LoadingButton';

export type ChatAddMembersDialogProps = {
  chat: Chat;
  show: boolean;
  close: () => void;
};

export const defaultChatAddMembersDialogProps: Readonly<ChatAddMembersDialogProps> = {
  chat: null,
  show: false,
  close: (): void => null,
};

const ChatAddMembersDialog = ({chat, show, close}: ChatAddMembersDialogProps) => {
  const dispatch = useAppDispatch();
  const relations = useAppSelector(ContactsSelectors.relations);
  const {t} = useTranslation();
  const [contactIds, setContactIds] = useState<string[]>([]);
  const [userIds, setUserIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addUsers = (): void => {
    setIsSubmitting(true);
    dispatch(ChatActions.addChatMembersThunk({chat, userIds}))
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
    const ignoredIds = chat?.members.map((m) => m.userId);
    const contactIds = relationUserIds.filter((id) => !ignoredIds || !ignoredIds.includes(id));
    setContactIds(contactIds);
  }, [relations, show]);

  const isUserIdListEmpty = userIds.length === 0;

  const content = chat && <UsersSelect contactIds={contactIds} setUserIds={setUserIds} />;

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

export default memo(ChatAddMembersDialog);
