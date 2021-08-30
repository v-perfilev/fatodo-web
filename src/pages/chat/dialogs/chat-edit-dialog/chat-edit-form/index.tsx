import {useTranslation} from 'react-i18next';
import React, {FC, useEffect} from 'react';
import {Form, FormikBag, FormikProps, withFormik} from 'formik';
import {ChatEditFormUtils, ChatEditValues} from './_form';
import {MultilineInput} from '../../../../../components/inputs';
import {FormDialogComponentProps} from '../../../../../components/dialogs';
import {withSnackContext} from '../../../../../shared/hocs/with-snack/with-snack';
import {SnackState} from '../../../../../shared/contexts/snack-context';
import {flowRight} from 'lodash';
import {Message} from '../../../../../models/message.model';
import ChatService from '../../../../../services/chat.service';

type BaseProps = FormDialogComponentProps;

type Props = FormikProps<ChatEditValues> & SnackState & BaseProps;

const ChatEditForm: FC<Props> = (props: Props) => {
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
      <MultilineInput name="text" label={t('chat:editMessage.fields.text.label')} rows={5} />
    </Form>
  );
};

const formik = withFormik<Props, ChatEditValues>({
  mapPropsToValues: ({params}: Props) => ChatEditFormUtils.mapPropsToValues(params.message),
  validationSchema: () => ChatEditFormUtils.validationSchema,
  validateOnMount: true,

  handleSubmit: (values: ChatEditValues, {props, setSubmitting}: FormikBag<Props, ChatEditValues>) => {
    const {params, handleCode, handleResponse} = props;

    const message = params.message as Message;
    const dto = ChatEditFormUtils.mapValuesToDTO(values);

    ChatService.editMessage(message.id, dto)
      .then(() => {
        handleCode('chat.messageEdited', 'info');
        props.close();
      })
      .catch((response) => {
        handleResponse(response);
        setSubmitting(false);
      });
  },
});

export default flowRight([withSnackContext, formik])(ChatEditForm);
