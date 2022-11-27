import {Formik, FormikHelpers} from 'formik';
import FVStack from '../../../../components/boxes/FVStack';
import FHStack from '../../../../components/boxes/FHStack';
import React from 'react';
import {useTranslation} from 'react-i18next';
import * as Yup from 'yup';
import i18n from '../../../../shared/i18n';
import {Chat} from '../../../../models/Chat';
import FormikTextInput from '../../../../components/inputs/FormikTextInput';
import {Button} from '@mui/material';
import LoadingButton from '../../../../components/controls/LoadingButton';

export interface ChatRenameFormValues {
  title: string;
}

const initialValues = (chat: Chat): ChatRenameFormValues => ({title: chat.title || ''});

const validationSchema = Yup.object().shape({
  title: Yup.string().required(() => i18n.t('chat:renameChat.fields.title.required')),
});

type ChatRenameFormProps = {
  chat: Chat;
  request: (title: string, stopSubmitting: () => void) => void;
  cancel: () => void;
};

const ChatRenameForm = ({chat, request, cancel}: ChatRenameFormProps) => {
  const {t} = useTranslation();

  const handleSubmit = (values: ChatRenameFormValues, helpers: FormikHelpers<ChatRenameFormValues>) => {
    request(values.title, () => helpers.setSubmitting(false));
  };

  return (
    <Formik
      initialValues={initialValues(chat)}
      validationSchema={validationSchema}
      validateOnMount
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <FVStack>
          <FormikTextInput
            name="title"
            label={t('chat:renameChat.fields.title.label')}
            disabled={formikProps.isSubmitting}
          />
          <FHStack justifyContent="flex-end">
            <Button variant="text" color="secondary" disabled={formikProps.isSubmitting} onClick={cancel}>
              {t('chat:renameChat.cancel')}
            </Button>
            <LoadingButton
              variant="text"
              color="primary"
              loading={formikProps.isSubmitting}
              disabled={!formikProps.isValid || formikProps.isSubmitting}
              onClick={formikProps.submitForm}
            >
              {t('chat:renameChat.send')}
            </LoadingButton>
          </FHStack>
        </FVStack>
      )}
    </Formik>
  );
};

export default ChatRenameForm;
