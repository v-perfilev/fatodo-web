import * as React from 'react';
import {FC} from 'react';
import {Form, FormikBag, FormikProps, withFormik} from 'formik';
import * as Yup from 'yup';
import {useTranslation} from 'react-i18next';
import AuthService from '../../../services/auth.service';
import {emailValidator, passwordValidator, usernameValidator} from '../common/_validators';
import {authFormStyles} from '../common/_styles';
import i18n from '../../../shared/i18n';
import {compose} from 'recompose';
import withCaptcha, {CaptchaProps} from '../../../shared/hoc/with-capcha';
import {TextInput} from '../../common/inputs/text-input';
import {PasswordInput} from '../../common/inputs/password-input';
import {LoadingButton} from '../../common/controls/loading-button';
import {PasswordStrengthBar} from '../password-strength-bar';
import {SnackState} from '../../../shared/contexts/snack-context';
import {withSnackContext} from '../../../shared/hoc/with-snack/with-snack';

type Props = FormikProps<any> &
  CaptchaProps &
  SnackState & {
    onSuccess: () => void;
  };

const RegistrationForm: FC<Props> = ({isValid, isSubmitting, values}: Props) => {
  const classes = authFormStyles();
  const {t} = useTranslation();

  return (
    <Form className={classes.root + ' ' + classes.minHeightBox + ' ' + classes.form}>
      <TextInput name="email" label={t('account:fields.email.label')} required />
      <TextInput name="username" label={t('account:fields.username.label')} required />
      <PasswordInput name="password" label={t('account:fields.password.label')} />
      <PasswordStrengthBar password={values.password} />
      <LoadingButton
        type="submit"
        color="secondary"
        fullWidth={true}
        disabled={!isValid || isSubmitting}
        loading={isSubmitting}
      >
        {t('account:register.submit')}
      </LoadingButton>
    </Form>
  );
};

interface FormValues {
  email: string;
  username: string;
  password: string;
}

const formik = withFormik<Props, FormValues>({
  mapPropsToValues: () => ({
    email: '',
    username: '',
    password: '',
  }),

  mapPropsToErrors: () => ({
    email: '',
    username: '',
    password: '',
  }),

  validationSchema: Yup.object().shape({
    email: emailValidator.check(),
    username: usernameValidator.check(),
    password: passwordValidator,
  }),

  validateOnMount: true,

  handleSubmit: (values: FormValues, {setSubmitting, props}: FormikBag<Props, FormValues>) => {
    const {token, updateToken, onSuccess, handleCode, handleResponse} = props;

    const data = {
      email: values.email,
      username: values.username,
      password: values.password,
      language: i18n.language,
      token: token,
    };

    AuthService.register(data)
      .then(() => {
        handleCode('auth.registered', 'info');
        onSuccess();
      })
      .catch((response) => {
        handleResponse(response);
        setSubmitting(false);
        updateToken();
      });
  },
});

export default compose(withCaptcha, withSnackContext, formik)(RegistrationForm);
