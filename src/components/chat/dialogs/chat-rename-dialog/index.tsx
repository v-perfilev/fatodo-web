import React, {FC} from 'react';
import {Chat} from '../../../../models/chat.model';
import {useTranslation} from 'react-i18next';
import FormDialog from '../../../common/dialogs/form-dialog';
import ChatRenameForm from './chat-rename-form';

type Props = {
  chat: Chat;
  isOpen: boolean;
  close: () => void;
};

const ChatRenameDialog: FC<Props> = ({chat, isOpen, close}: Props) => {
  const {t} = useTranslation();


  return (
    <FormDialog
      show={isOpen}
      close={close}
      FormComponent={ChatRenameForm}
      title={t('chat:createChat.title')}
      sendText={t('chat:createChat.send')}
      cancelText={t('chat:createChat.cancel')}
    />
  );
};

export default ChatRenameDialog;
