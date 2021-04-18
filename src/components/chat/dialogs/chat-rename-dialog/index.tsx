import React, {FC} from 'react';
import {Chat} from '../../../../models/chat.model';
import {useTranslation} from 'react-i18next';
import FormDialog from '../../../common/dialogs/form-dialog';
import ChatRenameForm from './chat-rename-form';

type Props = {
  chat: Chat;
  isOpen: boolean;
  close: () => void;
  title: string;
};

const ChatRenameDialog: FC<Props> = ({chat, isOpen, close, title}: Props) => {
  const {t} = useTranslation();

  const params = {chat, title};

  return (
    <FormDialog
      show={isOpen}
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
