import React, {FC} from 'react';
import FormDialog from '../../common/dialogs/form-dialog';
import CreateChatForm from './create-chat-form';
import {useTranslation} from 'react-i18next';

type Props = {
  show: boolean;
  setShow: (show: boolean) => void;
};

const CreateChatDialog: FC<Props> = ({show, setShow}: Props) => {
  const {t} = useTranslation();

  return (
    <FormDialog
      show={show}
      setShow={setShow}
      FormComponent={CreateChatForm}
      title={t('chat:createChat.title')}
      sendText={t('chat:createChat.send')}
      cancelText={t('chat:createChat.cancel')}
    />
  );
};

export default CreateChatDialog;
