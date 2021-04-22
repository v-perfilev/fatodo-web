import React, {FC} from 'react';
import FormDialog from '../../../common/dialogs/form-dialog';
import ContactRequestForm from './contact-request-form';
import {useTranslation} from 'react-i18next';

export type ContactRequestDialogProps = {
  show: boolean;
  close: () => void;
};

export const defaultContactRequestDialogProps: Readonly<ContactRequestDialogProps> = {
  show: false,
  close: (): void => undefined,
};

type Props = ContactRequestDialogProps;

const ContactRequestDialog: FC<Props> = ({show, close}: Props) => {
  const {t} = useTranslation();

  return (
    <FormDialog
      show={show}
      close={close}
      FormComponent={ContactRequestForm}
      title={t('contact:addContact.title')}
      sendText={t('contact:addContact.send')}
      cancelText={t('contact:addContact.cancel')}
    />
  );
};

export default ContactRequestDialog;
