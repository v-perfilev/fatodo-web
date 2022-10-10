import React, {FC} from 'react';
import {Chat} from '../../../../models/chat.model';
import {useTranslation} from 'react-i18next';
import FormDialog from '../../../../components/dialogs/FormDialog';
import ChatRenameForm from './chat-rename-form/chat-rename-form';

export type ChatRenameDialogProps = {
  chat: Chat;
  title: string;
  show: boolean;
  close: () => void;
};

export const defaultChatRenameDialogProps: Readonly<ChatRenameDialogProps> = {
  chat: null,
  title: null,
  show: false,
  close: (): void => undefined,
};

type Props = ChatRenameDialogProps;

const ChatRenameDialog: FC<Props> = ({chat, title, show, close}: Props) => {
  const {t} = useTranslation();

  const params = {chat, title};

  return (
    <FormDialog
      show={show}
      close={close}
      FormComponent={ChatRenameForm}
      title={t('chat:renameChat.title')}
      sendText={t('chat:renameChat.send')}
      cancelText={t('chat:renameChat.cancel')}
      params={params}
    />
  );
};

export default ChatRenameDialog;
