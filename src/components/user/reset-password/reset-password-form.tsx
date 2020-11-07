import {Form, FormikBag, FormikProps, withFormik} from 'formik';
import * as Yup from 'yup';
import * as React from 'react';
import {FC} from 'react';
import {authFormStyles} from '../common/_styles';
import {useTranslation} from 'react-i18next';
import {compose} from 'recompose';
import AuthService from '../../../services/auth.service';
import {passwordValidator, repeatPasswordValidator} from '../common/_validators';
import withCaptcha, {CaptchaProps} from '../../../shared/hoc/with-capcha';
import {PasswordInput} from '../../common/inputs/password-input';
import {LoadingButton} from '../../common/controls/loading-button';
import {PasswordStrengthBar} from '../password-strength-bar';
import {withSnackContext} from '../../../shared/hoc/with-snack/with-snack';
import {SnackState} from '../../../shared/contexts/snack-context';

type Props = FormikProps<any> &
  CaptchaProps &
  SnackState & {
    code: string;
    onSuccess: () => void;
    onFailure: () => void;
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
    const {code, token, updateToken, onSuccess, onFailure, handleCode, handleResponse} = props;

    const data = {
      code: code,
      password: values.password,
      token: token,
    };
    AuthService.resetPassword(data)
      .then(() => {
        handleCode('auth.afterResetPassword', 'info');
        onSuccess();
      })
      .catch((response) => {
        handleResponse(response);
        setSubmitting(false);
        updateToken();
        onFailure();
      });
  },
});

export default compose(withCaptcha, withSnackContext, formik)(ResetPasswordForm);
