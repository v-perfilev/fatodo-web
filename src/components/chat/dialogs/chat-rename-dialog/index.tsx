import React, {FC} from 'react';
import {Chat} from '../../../../models/chat.model';
import {useTranslation} from 'react-i18next';
import FormDialog from '../../../common/dialogs/form-dialog';
import ChatRenameForm from './chat-rename-form';

export type ChatRenameDialogProps = {
  chat: Chat;
  title: string;
  close: () => void;
};

export const defaultChatRenameDialogProps: Readonly<ChatRenameDialogProps> = {
  chat: null,
  title: '',
  close: (): void => {
  }
};

type Props = ChatRenameDialogProps;

const ChatRenameDialog: FC<Props> = ({chat, title, close}: Props) => {
  const {t} = useTranslation();

  const params = {chat, title};

  return (
    <FormDialog
      show={!!chat}
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
