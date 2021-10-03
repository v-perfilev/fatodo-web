import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import FormDialog from '../../../../components/dialogs/form-dialog';
import CommentEditForm from './chat-direct-message-form';
import {User} from '../../../../models/user.model';

export type ChatDirectMessageDialogProps = {
  user: User;
  show: boolean;
  close: () => void;
};

export const defaultChatDirectMessageDialogProps: Readonly<ChatDirectMessageDialogProps> = {
  user: null,
  show: false,
  close: (): void => undefined,
};

type Props = ChatDirectMessageDialogProps;

const ChatDirectMessageDialog: FC<Props> = ({user, show, close}: Props) => {
  const {t} = useTranslation();

  const params = {user};

  return (
    <FormDialog
      show={show}
      close={close}
      FormComponent={CommentEditForm}
      title={t('chat:directMessage.title')}
      sendText={t('chat:directMessage.send')}
      cancelText={t('chat:directMessage.cancel')}
      size="md"
      params={params}
    />
  );
};

export default ChatDirectMessageDialog;
