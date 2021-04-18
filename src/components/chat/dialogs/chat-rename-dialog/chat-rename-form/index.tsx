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
import {Chat} from '../../../../../models/chat.model';

type BaseProps = FormDialogComponentProps;

type Props = FormikProps<RenameChatValues> & SnackState & BaseProps;

const ChatRenameForm: FC<Props> = (props: Props) => {
  const {setIsSubmitting, setIsValid, setSubmitForm, setResetForm} = props;
  const {setErrors} = props;
  const {isValid, isSubmitting, submitForm, validateForm, resetForm} = props;
  const {t} = useTranslation();

  const title = props.params.title!;

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

const formik = withFormik<Props, RenameChatValues>({
  mapPropsToValues: ({params}: Props) => RenameChatFormUtils.mapPropsToValues(params.chat),
  validationSchema: () => RenameChatFormUtils.validationSchema,
  validateOnMount: true,

  handleSubmit: (values: RenameChatValues, {props, setSubmitting}: FormikBag<Props, RenameChatValues>) => {
    const {params, handleCode, handleResponse} = props;

    const chat = params.chat as Chat;
    const title = RenameChatFormUtils.mapValuesToDTO(values);

    ChatService.renameChat(chat.id, title)
      .then(() => {
        handleCode('message.chatRenamed', 'info');
        props.close();
      })
      .catch((response) => {
        handleResponse(response);
        setSubmitting(false);
      });
  }
});

export default compose<Props, BaseProps>(withSnackContext, formik)(ChatRenameForm);
