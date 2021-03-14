import {useTranslation} from 'react-i18next';
import React, {FC, useEffect} from 'react';
import {Form, FormikBag, FormikProps, withFormik} from 'formik';
import {compose} from 'recompose';
import {CreateChatFormUtils, CreateChatValues} from './_form';
import {TagsInput} from '../../../common/inputs';
import {FormDialogComponentProps} from '../../../common/dialogs';
import {withSnackContext} from '../../../../shared/hocs/with-snack/with-snack';
import {SnackState} from '../../../../shared/contexts/snack-context';
import MessageService from '../../../../services/message.service';
import {RootState} from '../../../../store';
import {AuthState} from '../../../../store/rerducers/auth.reducer';
import {connect, ConnectedProps} from 'react-redux';

const mapStateToProps = (state: RootState): {authState: AuthState} => ({authState: state.authState});
const connector = connect(mapStateToProps);

type Props = ConnectedProps<typeof connector> &
  FormikProps<CreateChatValues> &
  FormDialogComponentProps &
  SnackState;

const CreateChatForm: FC<Props> = (props: Props) => {
  const {setIsSubmitting, setIsValid, setSubmitForm, setResetForm} = props;
  const {
    values,
    errors,
    setFieldValue,
    setFieldTouched,
    isValid,
    isSubmitting,
    submitForm,
    validateForm,
    setErrors,
    resetForm
  } = props;
  const {t} = useTranslation();

  const inputInvalid = !!errors.user;

  useEffect(() => {
    setSubmitForm(() => (): void => {
      submitForm().finally();
    });
    setResetForm(() => (): void => {
      resetForm();
      validateForm().then((errors) => setErrors(errors));
    });
    validateForm().finally();
  }, []);

  useEffect(() => {
    setIsValid(isValid);
  }, [isValid]);

  useEffect(() => {
    setIsSubmitting(isSubmitting);
  }, [isSubmitting]);

  useEffect(() => {
    if (values.user.length > 0) {
      setFieldTouched('user');
    }
  }, [values.user]);

  useEffect(() => {
    // if (values.users) {
    //   setFieldValue('userIds', '');
    //   UserService.getByUserNameOrEmail(values.users[0])
    //     .then((response) => {
    //       setFieldValue('userId', response.data.id);
    //     })
    //     .catch(() => {
    //       // skip
    //     });
    // }
  }, [values.users]);

  return (
    <Form>
      <TagsInput name="users" label={t('message:createChat.fields.users.label')} inputName="user"
                 preventEnter={inputInvalid} />
    </Form>
  );
};

const formik = withFormik<Props, CreateChatValues>({
  mapPropsToValues: () => CreateChatFormUtils.mapPropsToValues(),
  validationSchema: ({authState: {account}}: Props) => CreateChatFormUtils.validationSchema(account),
  validateOnMount: true,

  handleSubmit: (
    values: CreateChatValues,
    {props, setSubmitting}: FormikBag<Props, CreateChatValues>
  ) => {
    const {handleCode, handleResponse} = props;

    const userIds = CreateChatFormUtils.mapValuesToDTO(values);

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

export default compose<FormDialogComponentProps>(withSnackContext, connector, formik)(CreateChatForm);
