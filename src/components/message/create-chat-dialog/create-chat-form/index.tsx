import {useTranslation} from 'react-i18next';
import React, {FC, useEffect} from 'react';
import {Form, FormikBag, FormikProps, withFormik} from 'formik';
import {compose} from 'recompose';
import {ContactRequestFormUtils, CreateChatValues} from './_form';
import UserService from '../../../../services/user.service';
import {TextInput} from '../../../common/inputs';
import {FormDialogComponentProps} from '../../../common/dialogs';
import {withSnackContext} from '../../../../shared/hocs/with-snack/with-snack';
import {SnackState} from '../../../../shared/contexts/snack-context';
import MessageService from '../../../../services/message.service';

type Props = FormikProps<CreateChatValues> &
  FormDialogComponentProps &
  SnackState;

const CreateChatForm: FC<Props> = (props: Props) => {
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
    if (values.users) {
      setFieldValue('userIds', '');
      UserService.getByUserNameOrEmail(values.users[0])
        .then((response) => {
          setFieldValue('userId', response.data.id);
        })
        .catch(() => {
          // skip
        });
    }
  }, [values.users]);

  return (
    <Form>
      <TextInput name="users" label={t('contact:addContact.fields.user.label')} required />
    </Form>
  );
};

const formik = withFormik<Props, CreateChatValues>({
  mapPropsToValues: () => ContactRequestFormUtils.mapPropsToValues(),
  validationSchema: ContactRequestFormUtils.validationSchema,
  validateOnMount: true,

  handleSubmit: (
    values: CreateChatValues,
    {props, setSubmitting}: FormikBag<Props, CreateChatValues>
  ) => {
    const {handleCode, handleResponse} = props;

    const userIds = ContactRequestFormUtils.mapValuesToDTO(values);

    const createChat = userIds.length === 1
      ? MessageService.createDirectChat(userIds[0])
      : MessageService.createIndirectChat(userIds);

    createChat
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

export default compose<FormDialogComponentProps>(withSnackContext, formik)(CreateChatForm);
