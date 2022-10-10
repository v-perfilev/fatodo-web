import {useTranslation} from 'react-i18next';
import React, {FC, useEffect} from 'react';
import {Form, FormikBag, FormikProps, withFormik} from 'formik';
import {ChatRenameFormUtils, ChatRenameValues} from './_form';
import {TextInput} from '../../../../../components/inputs';
import {FormDialogComponentProps} from '../../../../../components/dialogs';
import {withSnackContext} from '../../../../../shared/hocs/with-snack/with-snack';
import {SnackState} from '../../../../../shared/contexts/snack-context';
import ChatService from '../../../../../services/chat.service';
import {Chat} from '../../../../../models/chat.model';
import {flowRight} from 'lodash';

type BaseProps = FormDialogComponentProps;

type Props = FormikProps<ChatRenameValues> & SnackState & BaseProps;

const ChatRenameForm: FC<Props> = (props: Props) => {
  const {setIsSubmitting, setIsValid, setSubmitForm, setResetForm} = props;
  const {setErrors} = props;
  const {isValid, isSubmitting, submitForm, validateForm, resetForm} = props;
  const {t} = useTranslation();

  const title = props?.params?.title;

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
      <TextInput name="title" label={t('chat:renameChat.fields.title.label')} placeholder={title} />
    </Form>
  );
};

const formik = withFormik<Props, ChatRenameValues>({
  mapPropsToValues: ({params}: Props) => ChatRenameFormUtils.mapPropsToValues(params.chat),
  validationSchema: () => ChatRenameFormUtils.validationSchema,
  validateOnMount: true,

  handleSubmit: (values: ChatRenameValues, {props, setSubmitting}: FormikBag<Props, ChatRenameValues>) => {
    const {params, handleCode, handleResponse} = props;

    const chat = params.chat as Chat;
    const title = ChatRenameFormUtils.mapValuesToDTO(values);

    ChatService.renameChat(chat.id, title)
      .then(() => {
        handleCode('chat.chatRenamed', 'info');
        props.close();
      })
      .catch((response) => {
        handleResponse(response);
        setSubmitting(false);
      });
  },
});

export default flowRight([withSnackContext, formik])(ChatRenameForm);
