import {useTranslation} from 'react-i18next';
import React, {FC, useEffect} from 'react';
import {Form, FormikBag, FormikProps, withFormik} from 'formik';
import {ChatDirectMessageFormUtils, ChatDirectMessageValues} from './_form';
import {MultilineInput, TextInput} from '../../../../../components/inputs';
import {FormDialogComponentProps} from '../../../../../components/dialogs';
import {withSnackContext} from '../../../../../shared/hocs/with-snack/with-snack';
import {SnackState} from '../../../../../shared/contexts/snack-context';
import {flowRight} from 'lodash';
import ChatService from '../../../../../services/chat.service';
import {User} from '../../../../../models/user.model';

type BaseProps = FormDialogComponentProps;

type Props = FormikProps<ChatDirectMessageValues> & SnackState & BaseProps;

const ChatDirectMessageForm: FC<Props> = (props: Props) => {
  const {setIsSubmitting, setIsValid, setSubmitForm, setResetForm} = props;
  const {setErrors} = props;
  const {isValid, isSubmitting, submitForm, validateForm, resetForm} = props;
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

  return (
    <Form>
      <TextInput name="username" label={t('chat:directMessage.fields.username.label')} disabled />
      <MultilineInput name="text" label={t('chat:directMessage.fields.text.label')} rows={5} />
    </Form>
  );
};

const formik = withFormik<Props, ChatDirectMessageValues>({
  mapPropsToValues: ({params}: Props) => ChatDirectMessageFormUtils.mapPropsToValues(params.user),
  validationSchema: () => ChatDirectMessageFormUtils.validationSchema,
  validateOnMount: true,

  handleSubmit: (
    values: ChatDirectMessageValues,
    {props, setSubmitting}: FormikBag<Props, ChatDirectMessageValues>
  ) => {
    const {params, handleCode, handleResponse} = props;

    const user = params.user as User;
    const dto = ChatDirectMessageFormUtils.mapValuesToDTO(values);

    ChatService.sendDirectMessage(user.id, dto)
      .then(() => {
        handleCode('chat.messageSent', 'info');
        props.close();
      })
      .catch((response) => {
        handleResponse(response);
        setSubmitting(false);
      });
  },
});

export default flowRight([withSnackContext, formik])(ChatDirectMessageForm);
