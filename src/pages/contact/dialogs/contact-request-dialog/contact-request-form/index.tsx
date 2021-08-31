import {useTranslation} from 'react-i18next';
import React, {FC, useEffect} from 'react';
import {Form, FormikBag, FormikProps, withFormik} from 'formik';
import {ContactRequestFormUtils, ContactRequestFormValues} from './_form';
import {AuthState} from '../../../../../store/rerducers/auth.reducer';
import UserService from '../../../../../services/user.service';
import {MultilineInput, TextInput} from '../../../../../components/inputs';
import {FormDialogComponentProps} from '../../../../../components/dialogs';
import {withSnackContext} from '../../../../../shared/hocs/with-snack/with-snack';
import {SnackState} from '../../../../../shared/contexts/snack-context';
import ContactService from '../../../../../services/contact.service';
import withAuthState from '../../../../../shared/hocs/with-auth-state/with-auth-state';
import {flowRight} from 'lodash';

type BaseProps = FormDialogComponentProps;

type Props = AuthState & FormikProps<ContactRequestFormValues> & SnackState & BaseProps;

const ContactRequestForm: FC<Props> = (props: Props) => {
  const {setIsSubmitting, setIsValid, setSubmitForm, setResetForm} = props;
  const {values, errors, setFieldValue, isValid, isSubmitting, submitForm, validateForm, setErrors, resetForm} = props;
  const {t} = useTranslation();

  useEffect(() => {
    setSubmitForm(() => (): void => {
      submitForm().finally();
    });
    setResetForm(() => (): void => {
      resetForm();
      validateForm().then((errors) => setErrors(errors));
    });
  }, []);

  useEffect(() => {
    setIsValid(isValid);
  }, [isValid]);

  useEffect(() => {
    setIsSubmitting(isSubmitting);
  }, [isSubmitting]);

  useEffect(() => {
    if (values.usernameOrEmail && !errors.usernameOrEmail) {
      setFieldValue('user', null);
      UserService.getByUsernameOrEmail(values.usernameOrEmail)
        .then((response) => {
          setFieldValue('user', response.data);
        })
        .catch(() => {
          // skip
        });
    }
  }, [values.usernameOrEmail, errors.usernameOrEmail]);

  return (
    <Form>
      <TextInput name="usernameOrEmail" label={t('contact:addContact.fields.user.label')} required />
      <MultilineInput name="message" label={t('contact:addContact.fields.message.label')} rows={4} />
    </Form>
  );
};

const formik = withFormik<Props, ContactRequestFormValues>({
  mapPropsToValues: () => ContactRequestFormUtils.mapPropsToValues(),
  validationSchema: ({account}: Props) => ContactRequestFormUtils.validationSchema(account),
  validateOnMount: true,

  handleSubmit: (
    values: ContactRequestFormValues,
    {props, setSubmitting}: FormikBag<Props, ContactRequestFormValues>
  ) => {
    const {handleCode, handleResponse} = props;

    const dto = ContactRequestFormUtils.mapValuesToDTO(values);

    ContactService.sendRequest(dto)
      .then(() => {
        handleCode('contact.requestSent', 'info');
        props.close();
      })
      .catch((response) => {
        handleResponse(response);
        setSubmitting(false);
      });
  },
});

export default flowRight([withSnackContext, withAuthState, formik])(ContactRequestForm);
