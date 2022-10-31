import {Formik, FormikHelpers} from 'formik';
import FVStack from '../../../../components/boxes/FVStack';
import FHStack from '../../../../components/boxes/FHStack';
import React from 'react';
import {useTranslation} from 'react-i18next';
import * as Yup from 'yup';
import {MessageDTO} from '../../../../models/dto/MessageDTO';
import i18n from '../../../../shared/i18n';
import FormikTextInput from '../../../../components/inputs/FormikTextInput';
import {User} from '../../../../models/User';
import {Button} from '@mui/material';
import LoadingButton from '../../../../components/controls/LoadingButton';

export interface ChatDirectMessageFormValues {
  username: string;
  text: string;
}

export const defaultChatDirectMessageFormValues: Readonly<ChatDirectMessageFormValues> = {
  username: '',
  text: '',
};

const initialValues = (user: User): ChatDirectMessageFormValues => ({
  ...defaultChatDirectMessageFormValues,
  username: user.username,
});

const validationSchema = Yup.object().shape({
  text: Yup.string().required(() => i18n.t('chat:directMessage.fields.text.required')),
});

type ChatDirectMessageFormProps = {
  user: User;
  request: (dto: MessageDTO, stopSubmitting: () => void) => void;
  cancel: () => void;
};

const ChatDirectMessageForm = ({user, request, cancel}: ChatDirectMessageFormProps) => {
  const {t} = useTranslation();

  const handleSubmit = (values: ChatDirectMessageFormValues, helpers: FormikHelpers<ChatDirectMessageFormValues>) => {
    const dto: MessageDTO = {text: values.text};
    request(dto, () => helpers.setSubmitting(false));
  };

  return (
    <Formik
      initialValues={initialValues(user)}
      validationSchema={validationSchema}
      validateOnMount
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <FVStack>
          <FormikTextInput name="username" label={t('chat:directMessage.fields.username.label')} disabled />
          <FormikTextInput
            name="text"
            label={t('chat:directMessage.fields.text.label')}
            disabled={formikProps.isSubmitting}
            rows={4}
          />
          <FHStack justifyContent="flex-end">
            <Button variant="text" color="secondary" disabled={formikProps.isSubmitting} onClick={cancel}>
              {t('chat:directMessage.cancel')}
            </Button>
            <LoadingButton
              color="primary"
              loading={formikProps.isSubmitting}
              disabled={!formikProps.isValid || formikProps.isSubmitting}
              onClick={formikProps.submitForm}
            >
              {t('chat:directMessage.send')}
            </LoadingButton>
          </FHStack>
        </FVStack>
      )}
    </Formik>
  );
};

export default ChatDirectMessageForm;
