import React, {FC, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import ModalDialog from '../../../../components/dialogs/modal-dialog';
import ContactService from '../../../../services/contact.service';
import ChatService from '../../../../services/chat.service';
import {Button} from '@material-ui/core';
import {useSnackContext} from '../../../../shared/contexts/snack-context';
import {LoadingButton} from '../../../../components/controls';
import UsersSelect from '../../../../components/surfaces/users-select';

export type ChatCreateDialogProps = {
  show: boolean;
  close: () => void;
};

export const defaultChatCreateDialogProps: Readonly<ChatCreateDialogProps> = {
  show: false,
  close: (): void => undefined,
};

type Props = ChatCreateDialogProps;

const ChatCreateDialog: FC<Props> = ({show, close}: Props) => {
  const {handleCode, handleResponse} = useSnackContext();
  const {t} = useTranslation();
  const [contactIds, setContactIds] = useState<string[]>([]);
  const [userIds, setUserIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadContacts = (): void => {
    ContactService.getAllRelations()
      .then((response) => {
        const relations = response.data;
        const relationUserIds = relations.map((relation) => relation.secondUserId);
        setContactIds(relationUserIds);
      })
      .catch((response) => {
        handleResponse(response);
      });
  };

  const createChat = (): void => {
    const createChat =
      userIds.length === 1 ? ChatService.createDirectChat(userIds[0]) : ChatService.createIndirectChat(userIds);

    setIsSubmitting(true);
    createChat
      .then(() => {
        handleCode('message.chatCreated', 'info');
        close();
      })
      .catch((response) => {
        handleResponse(response);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const isUserIdListEmpty = userIds.length == 0;

  useEffect(() => {
    if (show) {
      loadContacts();
    }
  }, [show]);

  const content = <UsersSelect priorityIds={contactIds} ignoredIds={[]} setUserIds={setUserIds} />;

  const cancelButton = (
    <Button onClick={close} color="primary" disabled={isSubmitting}>
      {t('chat:createChat.cancel')}
    </Button>
  );

  const sendButton = (
    <LoadingButton
      color="secondary"
      disabled={isSubmitting || isUserIdListEmpty}
      loading={isSubmitting}
      onClick={createChat}
    >
      {t('chat:createChat.send')}
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
      title={t('chat:createChat.title')}
      content={content}
      actions={actions}
      showCloseIcon
    />
  );
};

export default ChatCreateDialog;
