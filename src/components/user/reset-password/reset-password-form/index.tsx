import {Form, FormikBag, FormikProps, withFormik} from 'formik';
import * as React from 'react';
import {FC} from 'react';
import {authFormStyles} from '../../_styles';
import {useTranslation} from 'react-i18next';
import {compose} from 'recompose';
import AuthService from '../../../../services/auth.service';
import withCaptcha, {CaptchaProps} from '../../../../shared/hocs/with-capcha';
import {PasswordInput} from '../../../common/inputs';
import {LoadingButton} from '../../../common/controls';
import {PasswordStrengthBar} from '../../password-strength-bar';
import {withSnackContext} from '../../../../shared/hocs/with-snack/with-snack';
import {SnackState} from '../../../../shared/contexts/snack-context';
import {ResetPasswordFormUtils, ResetPasswordFormValues} from './_form';

type Props = FormikProps<ResetPasswordFormValues> &
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

const formik = withFormik<Props, ResetPasswordFormValues>({
  mapPropsToValues: ResetPasswordFormUtils.mapPropsToValues,
  validationSchema: ResetPasswordFormUtils.validationSchema,
  validateOnMount: true,

  handleSubmit: (
    values: ResetPasswordFormValues,
    {setSubmitting, props}: FormikBag<Props, ResetPasswordFormValues>
  ) => {
    const {code, token, updateToken, onSuccess, onFailure, handleCode, handleResponse} = props;

    const dto = ResetPasswordFormUtils.mapValuesToDTO(values, code, token);

    AuthService.resetPassword(dto)
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