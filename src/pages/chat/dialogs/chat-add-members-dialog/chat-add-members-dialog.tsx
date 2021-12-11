import React, {FC, useEffect, useState} from 'react';
import {Chat} from '../../../../models/chat.model';
import {useTranslation} from 'react-i18next';
import {Button} from '@material-ui/core';
import ChatService from '../../../../services/chat.service';
import {useSnackContext} from '../../../../shared/contexts/snack-context';
import {LoadingButton} from '../../../../components/controls';
import UsersSelect from '../../../../components/surfaces/users-select/users-select';
import {useContactContext} from '../../../../shared/contexts/contact-contexts/contact-context';
import ModalDialog from '../../../../components/dialogs/modal-dialog/modal-dialog';

export type ChatAddMembersDialogProps = {
  chat: Chat;
  show: boolean;
  close: () => void;
};

export const defaultChatAddMembersDialogProps: Readonly<ChatAddMembersDialogProps> = {
  chat: null,
  show: false,
  close: (): void => undefined,
};

type Props = ChatAddMembersDialogProps;

const ChatAddMembersDialog: FC<Props> = ({chat, show, close}: Props) => {
  const {handleResponse} = useSnackContext();
  const {t} = useTranslation();
  const {relations, update} = useContactContext();
  const [contactIds, setContactIds] = useState<string[]>([]);
  const [userIds, setUserIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addUsers = (): void => {
    setIsSubmitting(true);
    ChatService.addUsersToChat(chat.id, userIds)
      .then(() => {
        close();
      })
      .catch((response) => {
        handleResponse(response);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  useEffect(() => {
    if (show) {
      update();
    }
  }, [show]);

  useEffect(() => {
    const relationUserIds = relations.map((relation) => relation.secondUserId);
    setContactIds(relationUserIds);
  }, [relations]);

  const isUserIdListEmpty = userIds.length == 0;
  const ignoredIds = chat?.members;
  const content = chat && <UsersSelect allowedIds={contactIds} ignoredIds={ignoredIds} setUserIds={setUserIds} />;

  const cancelButton = (
    <Button onClick={close} color="primary" disabled={isSubmitting}>
      {t('chat:addMembers.buttons.cancel')}
    </Button>
  );

  const sendButton = (
    <LoadingButton
      color="secondary"
      disabled={isSubmitting || isUserIdListEmpty}
      loading={isSubmitting}
      onClick={addUsers}
    >
      {t('chat:addMembers.buttons.send')}
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
      title={t('chat:addMembers.title')}
      content={content}
      actions={actions}
      showCloseIcon
    />
  );
};

export default ChatAddMembersDialog;
