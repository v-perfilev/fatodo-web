import {Formik, FormikHelpers} from 'formik';
import FVStack from '../../../../components/boxes/FVStack';
import FHStack from '../../../../components/boxes/FHStack';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {User, UserAccount} from '../../../../models/User';
import * as Yup from 'yup';
import {userValidator} from '../../../../shared/validators';
import {useAppSelector} from '../../../../store/store';
import AuthSelectors from '../../../../store/auth/authSelectors';
import {ContactRequestDTO} from '../../../../models/dto/ContactRequestDTO';
import FormikTextInput from '../../../../components/inputs/FormikTextInput';
import {Button} from '@mui/material';
import LoadingButton from '../../../../components/controls/LoadingButton';
import FormikUserInput from '../../../../components/inputs/FormikUserInput';

export interface ContactRequestFormValues {
  usernameOrEmail: string;
  user: User;
  message: string;
}

export const defaultContactRequestFormValues: Readonly<ContactRequestFormValues> = {
  usernameOrEmail: '',
  user: null,
  message: '',
};

const validationSchema = (account: UserAccount) =>
  Yup.object().shape({
    usernameOrEmail: userValidator(account.username, account.email).check(),
    user: Yup.string().required(),
  });

type ContactRequestDialogFormProps = {
  request: (dto: ContactRequestDTO, stopSubmitting: () => void) => void;
  cancel: () => void;
};

const ContactRequestDialogForm = ({request, cancel}: ContactRequestDialogFormProps) => {
  const {t} = useTranslation();
  const account = useAppSelector(AuthSelectors.account);

  const handleSubmit = (values: ContactRequestFormValues, helpers: FormikHelpers<ContactRequestFormValues>) => {
    const dto: ContactRequestDTO = {recipientId: values.user.id, message: values.message};
    request(dto, () => helpers.setSubmitting(false));
  };

  return (
    <Formik
      initialValues={defaultContactRequestFormValues}
      validationSchema={validationSchema(account)}
      validateOnMount
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <FVStack>
          <FormikUserInput
            name="usernameOrEmail"
            userName="user"
            label={t('contact:addContact.fields.user.label')}
            disabled={formikProps.isSubmitting}
          />
          <FormikTextInput
            name="message"
            label={t('contact:addContact.fields.message.label')}
            disabled={formikProps.isSubmitting}
            rows={4}
          />
          <FHStack justifyContent="flex-end">
            <Button variant="text" color="secondary" disabled={formikProps.isSubmitting} onClick={cancel}>
              {t('contact:addContact.cancel')}
            </Button>
            <LoadingButton
              color="primary"
              loading={formikProps.isSubmitting}
              disabled={!formikProps.isValid || formikProps.isSubmitting}
              onClick={formikProps.submitForm}
            >
              {t('group:actions.save')}
            </LoadingButton>
          </FHStack>
        </FVStack>
      )}
    </Formik>
  );
};

export default ContactRequestDialogForm;
