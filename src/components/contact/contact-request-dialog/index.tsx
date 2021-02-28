import React, {FC} from 'react';
import FormDialog from '../../common/dialogs/form-dialog';
import ContactRequestForm from './contact-request-form';
import {useTranslation} from 'react-i18next';

type Props = {
  show: boolean;
  setShow: (show: boolean) => void;
};

const ContactRequestDialog: FC<Props> = ({show, setShow}: Props) => {
  const {t} = useTranslation();

  return (
    <FormDialog
      show={show}
      setShow={setShow}
      FormComponent={ContactRequestForm}
      title={t('contact:addContact.title')}
      sendText={t('contact:addContact.send')}
      cancelText={t('contact:addContact.cancel')}
    />
  );
};

export default ContactRequestDialog;