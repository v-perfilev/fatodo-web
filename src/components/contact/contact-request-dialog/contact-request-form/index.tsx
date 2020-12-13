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

const mapStateToProps = (state: RootState): {authState: AuthState} => ({authState: state.authState});
const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector> & FormikProps<ContactRequestFormValues> & FormDialogComponentProps;

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

  handleSubmit: (values: ContactRequestFormValues, {setSubmitting}: FormikBag<Props, ContactRequestFormValues>) => {
    console.log('!');
    setSubmitting(false);
  },
});

export default compose<FormDialogComponentProps>(connector, formik)(ContactRequestForm);
