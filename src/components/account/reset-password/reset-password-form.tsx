import {Form, FormikBag, FormikProps, withFormik} from 'formik';
import * as Yup from 'yup';
import * as React from 'react';
import {FC} from 'react';
import {authFormStyles} from '../common/_styles';
import {useTranslation} from 'react-i18next';
import {compose} from 'recompose';
import AccountService from '../../../services/account.service';
import {passwordValidator, repeatPasswordValidator} from '../common/_validators';
import {Notification} from '../../../shared/notification/notification';
import withCaptcha, {CaptchaProps} from '../../../shared/hoc/with-capcha';
import withCaptchaProvider from '../../../shared/hoc/with-captcha-provider';
import {PasswordInput} from '../../common/inputs/password-input';
import {LoadingButton} from '../../common/layouts/loading-button';
import {PasswordStrengthBar} from '../password-strength-bar';

type Props = FormikProps<any> &
  CaptchaProps & {
    code: string;
    onSuccess: () => void;
    onFailure: (status: number) => void;
  };

const ResetPasswordForm: FC<Props> = ({isValid, isSubmitting, values}: Props) => {
  const classes = authFormStyles();
  const {t} = useTranslation();

  return (
    <Form className={classes.root + ' ' + classes.form}>
      <PasswordInput name="password" label={t('account:fields.newPassword.label')} />
      <PasswordInput name="repeatPassword" label={t('account:fields.repeatPassword.label')} />
      <PasswordStrengthBar password={values.password} />
      <LoadingButton
        type="submit"
        color="secondary"
        fullWidth={true}
        disabled={!isValid || isSubmitting}
        loading={isSubmitting}
      >
        {t('account:resetPassword.submit')}
      </LoadingButton>
    </Form>
  );
};

interface FormValues {
  password: string;
  repeatPassword: string;
}

const formik = withFormik<Props, FormValues>({
  mapPropsToValues: () => ({
    password: '',
    repeatPassword: '',
  }),

  mapPropsToErrors: () => ({
    password: '',
    repeatPassword: '',
  }),

  validationSchema: Yup.object().shape({
    password: passwordValidator,
    repeatPassword: repeatPasswordValidator,
  }),

  validateOnMount: true,

  handleSubmit: (values: FormValues, {setSubmitting, props}: FormikBag<Props, FormValues>) => {
    const {code, token, updateToken} = props;
    const data = {
      code: code,
      password: values.password,
      token: token,
    };
    AccountService.resetPassword(data)
      .then(() => {
        Notification.handleSnack('auth.afterResetPassword', 'info');
        props.onSuccess();
      })
      .catch((response) => {
        Notification.handleFeedback(response);
        setSubmitting(false);
        updateToken();
        props.onFailure(response?.status);
      });
  },
});

export default compose(withCaptchaProvider, withCaptcha, formik)(ResetPasswordForm);
