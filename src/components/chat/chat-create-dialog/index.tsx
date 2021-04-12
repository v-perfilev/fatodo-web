import React, {FC} from 'react';
import FormDialog from '../../common/dialogs/form-dialog';
import ChatCreateForm from './chat-create-form';
import {useTranslation} from 'react-i18next';

type Props = {
  show: boolean;
  setShow: (show: boolean) => void;
};

const ChatCreateDialog: FC<Props> = ({show, setShow}: Props) => {
  const {t} = useTranslation();

  return (
    <FormDialog
      show={show}
      setShow={setShow}
      FormComponent={ChatCreateForm}
      title={t('chat:createChat.title')}
      sendText={t('chat:createChat.send')}
      cancelText={t('chat:createChat.cancel')}
    />
  );
};

export default ChatCreateDialog;
