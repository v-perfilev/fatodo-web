import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import FormDialog from '../../../../components/dialogs/form-dialog';
import CommentEditForm from './chat-edit-form';
import {Message} from '../../../../models/message.model';

export type ChatEditDialogProps = {
  message: Message;
  show: boolean;
  close: () => void;
};

export const defaultChatEditDialogProps: Readonly<ChatEditDialogProps> = {
  message: null,
  show: false,
  close: (): void => undefined,
};

type Props = ChatEditDialogProps;

const ChatEditDialog: FC<Props> = ({message, show, close}: Props) => {
  const {t} = useTranslation();

  const params = {message};

  return (
    <FormDialog
      show={show}
      close={close}
      FormComponent={CommentEditForm}
      title={t('chat:editMessage.title')}
      sendText={t('chat:editMessage.send')}
      cancelText={t('chat:editMessage.cancel')}
      params={params}
    />
  );
};

export default ChatEditDialog;
