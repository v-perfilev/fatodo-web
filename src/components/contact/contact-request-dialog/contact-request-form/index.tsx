import {useTranslation} from 'react-i18next';
import React, {FC, useEffect} from 'react';
import {Form, FormikBag, FormikProps, withFormik} from 'formik';
import {compose} from 'recompose';
import {connect, ConnectedProps} from 'react-redux';
import {ContactRequestFormUtils, ContactRequestFormValues} from './_form';
import {AuthState} from '../../../../store/rerducers/auth.reducer';
import {RootState} from '../../../../store';
import UserService from '../../../../services/user.service';
import {MultilineInput, TextInput} from '../../../common/inputs';
import {FormDialogComponentProps} from '../../../common/dialogs';
import {withSnackContext} from '../../../../shared/hocs/with-snack/with-snack';
import {SnackState} from '../../../../shared/contexts/snack-context';
import ContactService from '../../../../services/contact.service';

const mapStateToProps = (state: RootState): {authState: AuthState} => ({authState: state.authState});
const connector = connect(mapStateToProps);

type Props =
  ConnectedProps<typeof connector>
  & FormikProps<ContactRequestFormValues>
  & FormDialogComponentProps
  & SnackState;

const ContactRequestForm: FC<Props> = (props: Props) => {
  const {setIsSubmitting, setIsValid, setSubmitForm, setResetForm} = props;
  const {values, setFieldValue, isValid, isSubmitting, submitForm, validateForm, setErrors, resetForm} = props;
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
    if (values.user) {
      setFieldValue('userId', '');
      UserService.getByUserNameOrEmail(values.user)
        .then((response) => {
          setFieldValue('userId', response.data.id);
        })
        .catch(() => {
          // skip
        });
    }
  }, [values.user]);

  return (
    <Form>
      <TextInput name="user" label={t('contact:addContact.fields.user.label')} required />
      <MultilineInput name="message" label={t('contact:addContact.fields.message.label')} rows={4} />
    </Form>
  );
};

const formik = withFormik<Props, ContactRequestFormValues>({
  mapPropsToValues: () => ContactRequestFormUtils.mapPropsToValues(),
  validationSchema: ({authState: {account}}: Props) => ContactRequestFormUtils.validationSchema(account),
  validateOnMount: true,

  handleSubmit: (values: ContactRequestFormValues, {
    props,
    setSubmitting
  }: FormikBag<Props, ContactRequestFormValues>) => {
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
  }
});

export default compose<FormDialogComponentProps>(withSnackContext, connector, formik)(ContactRequestForm);
