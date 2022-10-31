import {Formik, FormikHelpers} from 'formik';
import FVStack from '../../../../components/boxes/FVStack';
import FHStack from '../../../../components/boxes/FHStack';
import React from 'react';
import {useTranslation} from 'react-i18next';
import * as Yup from 'yup';
import {MessageDTO} from '../../../../models/dto/MessageDTO';
import i18n from '../../../../shared/i18n';
import {Message} from '../../../../models/Message';
import FormikTextInput from '../../../../components/inputs/FormikTextInput';
import {Button} from '@mui/material';
import LoadingButton from '../../../../components/controls/LoadingButton';

export interface ChatEditMessageFormValues {
  text: string;
}

const initialValues = (message: Message): ChatEditMessageFormValues => ({text: message.text});

const validationSchema = Yup.object().shape({
  text: Yup.string().required(() => i18n.t('chat:editMessage.fields.text.required')),
});

type ChatEditMessageFormProps = {
  message: Message;
  request: (dto: MessageDTO, stopSubmitting: () => void) => void;
  cancel: () => void;
};

const ChatEditMessageForm = ({message, request, cancel}: ChatEditMessageFormProps) => {
  const {t} = useTranslation();

  const handleSubmit = (values: ChatEditMessageFormValues, helpers: FormikHelpers<ChatEditMessageFormValues>) => {
    const dto: MessageDTO = {text: values.text};
    request(dto, () => helpers.setSubmitting(false));
  };

  return (
    <Formik
      initialValues={initialValues(message)}
      validationSchema={validationSchema}
      validateOnMount
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <FVStack>
          <FormikTextInput
            name="text"
            label={t('chat:editMessage.fields.text.label')}
            disabled={formikProps.isSubmitting}
            rows={4}
          />
          <FHStack justifyContent="flex-end">
            <Button variant="text" color="secondary" disabled={formikProps.isSubmitting} onClick={cancel}>
              {t('chat:editMessage.cancel')}
            </Button>
            <LoadingButton
              color="primary"
              loading={formikProps.isSubmitting}
              disabled={!formikProps.isValid || formikProps.isSubmitting}
              onClick={formikProps.submitForm}
            >
              {t('chat:editMessage.send')}
            </LoadingButton>
          </FHStack>
        </FVStack>
      )}
    </Formik>
  );
};

export default ChatEditMessageForm;
