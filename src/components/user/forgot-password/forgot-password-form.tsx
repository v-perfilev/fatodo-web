import {Form, FormikBag, FormikProps, withFormik} from 'formik';
import * as Yup from 'yup';
import * as React from 'react';
import {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {compose} from 'recompose';
import withCaptcha, {CaptchaProps} from '../../../shared/hoc/with-capcha';
import {authFormStyles} from '../common/_styles';
import {TextInput} from '../../common/inputs/text-input';
import {LoadingButton} from '../../common/controls/loading-button';
import i18n from '../../../shared/i18n';
import AuthService from '../../../services/auth.service';
import {SnackState} from '../../../shared/contexts/snack-context';
import {withSnackContext} from '../../../shared/hoc/with-snack';

type Props = FormikProps<any> &
  CaptchaProps &
  SnackState & {
  onSuccess?: () => void;
};

const ForgotPasswordForm: FC<Props> = ({isValid, isSubmitting}: Props) => {
  const classes = authFormStyles();
  const {t} = useTranslation();

  return (
    <Form className={classes.root + ' ' + classes.form}>
      <TextInput name="user" label={t('account:fields.user.label')} required />
      <LoadingButton
        type="submit"
        color="secondary"
        fullWidth={true}
        disabled={!isValid || isSubmitting}
        loading={isSubmitting}
      >
        {t('account:forgotPassword.submit')}
      </LoadingButton>
    </Form>
  );
};

interface FormValues {
  user: string;
}

const formik = withFormik<Props, FormValues>({
  mapPropsToValues: () => ({
    user: ''
  }),

  mapPropsToErrors: () => ({
    user: ''
  }),

  validationSchema: Yup.object().shape({
    user: Yup.string().required(() => i18n.t('account:fields.user.required'))
  }),

  validateOnMount: true,

  handleSubmit: (values: FormValues, {setSubmitting, props}: FormikBag<Props, FormValues>) => {
    const {token, updateToken, handleCode, handleResponse} = props;

    const data = {
      user: values.user,
      token: token
    };

    AuthService.requestResetPasswordCode(data)
      .then(() => {
        handleCode('auth.afterForgotPassword', 'info');
        props.onSuccess();
      })
      .catch((response) => {
        handleResponse(response);
        setSubmitting(false);
        updateToken();
      });
  }
});

export default compose(withCaptcha, withSnackContext, formik)(ForgotPasswordForm);
