import {useTranslation} from 'react-i18next';
import React, {FC, useEffect, useState} from 'react';
import {Form, FormikBag, FormikProps, withFormik} from 'formik';
import {compose} from 'recompose';
import {CreateChatFormUtils, CreateChatValues} from './_form';
import {TagsInput} from '../../../common/inputs';
import {FormDialogComponentProps} from '../../../common/dialogs';
import {withSnackContext} from '../../../../shared/hocs/with-snack/with-snack';
import {SnackState} from '../../../../shared/contexts/snack-context';
import ChatService from '../../../../services/chat.service';
import {AuthState} from '../../../../store/rerducers/auth.reducer';
import UserService from '../../../../services/user.service';
import {User} from '../../../../models/user.model';
import withAuthState from '../../../../shared/hocs/with-auth-state';

type Props = AuthState & FormikProps<CreateChatValues> & FormDialogComponentProps & SnackState;

const CreateChatForm: FC<Props> = (props: Props) => {
  const {setIsSubmitting, setIsValid, setSubmitForm, setResetForm} = props;
  const {setFieldValue, setFieldTouched, setErrors} = props;
  const {values, errors, isValid, isSubmitting, submitForm, validateForm, resetForm} = props;
  const {t} = useTranslation();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    setSubmitForm(() => (): void => {
      submitForm().finally();
    });
    setResetForm(() => (): void => {
      resetForm();
      validateForm().then((errors) => setErrors(errors));
    });
    setFieldTouched('user');
  }, []);

  useEffect(() => {
    setIsValid(isValid);
  }, [isValid]);

  useEffect(() => {
    setIsSubmitting(isSubmitting);
  }, [isSubmitting]);

  useEffect(() => {
    if (values.usernames) {
      setFieldValue('users', []);
      values.usernames.forEach((username) => {
        const trimmedUsername = username.trim();
        const userFromCache = users.find((user) => user.username === trimmedUsername);
        if (userFromCache) {
          if (!values.users.includes(userFromCache)) {
            setFieldValue('users', [userFromCache, ...values.users]);
          }
        } else {
          UserService.getByUsername(trimmedUsername)
            .then((response) => {
              setUsers((users) => [response.data, ...users]);
              setFieldValue('users', [response.data, ...values.users]);
            })
            .catch(() => {
              // skip
            });
        }
      });
    }
  }, [values.usernames]);

  return (
    <Form>
      <TagsInput
        name="usernames"
        label={t('chat:createChat.fields.users.label')}
        inputName="user"
        preventEnter={!!errors.user}
      />
    </Form>
  );
};

const formik = withFormik<Props, CreateChatValues>({
  mapPropsToValues: () => CreateChatFormUtils.mapPropsToValues(),
  validationSchema: ({account}: Props) => CreateChatFormUtils.validationSchema(account),
  validateOnMount: true,

  handleSubmit: (values: CreateChatValues, {props, setSubmitting}: FormikBag<Props, CreateChatValues>) => {
    const {handleCode, handleResponse} = props;

    const userIds = CreateChatFormUtils.mapValuesToDTO(values);

    const createChat =
      userIds.length === 1 ? ChatService.createDirectChat(userIds[0]) : ChatService.createIndirectChat(userIds);

    createChat
      .then(() => {
        handleCode('message.chatCreated', 'info');
        props.close();
      })
      .catch((response) => {
        handleResponse(response);
        setSubmitting(false);
      });
  },
});

export default compose<FormDialogComponentProps>(withSnackContext, withAuthState, formik)(CreateChatForm);
