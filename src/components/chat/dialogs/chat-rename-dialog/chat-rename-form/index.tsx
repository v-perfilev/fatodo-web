import {useTranslation} from 'react-i18next';
import React, {FC, useEffect} from 'react';
import {Form, FormikBag, FormikProps, withFormik} from 'formik';
import {compose} from 'recompose';
import {RenameChatFormUtils, RenameChatValues} from './_form';
import {TextInput} from '../../../../common/inputs';
import {FormDialogComponentProps} from '../../../../common/dialogs';
import {withSnackContext} from '../../../../../shared/hocs/with-snack/with-snack';
import {SnackState} from '../../../../../shared/contexts/snack-context';
import ChatService from '../../../../../services/chat.service';

type BaseProps = FormDialogComponentProps;

type Props = FormikProps<RenameChatValues> & SnackState & BaseProps;

const ChatRenameForm: FC<Props> = (props: Props) => {
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
      <TextInput name="title" label={t('chat:createChat.fields.users.label')} placeholder={'test'} />
    </Form>
  );
};

const formik = withFormik<Props, RenameChatValues>({
  mapPropsToValues: () => RenameChatFormUtils.mapPropsToValues(),
  validationSchema: () => RenameChatFormUtils.validationSchema,
  validateOnMount: true,

  handleSubmit: (values: RenameChatValues, {props, setSubmitting}: FormikBag<Props, RenameChatValues>) => {
    const {handleCode, handleResponse} = props;

    const title = RenameChatFormUtils.mapValuesToDTO(values);

    ChatService.renameChat(null, title)
      .then(() => {
        handleCode('message.chatCreated', 'info');
        props.close();
      })
      .catch((response) => {
        handleResponse(response);
        setSubmitting(false);
      });
  }
});

export default compose<Props, BaseProps>(withSnackContext, formik)(ChatRenameForm);
