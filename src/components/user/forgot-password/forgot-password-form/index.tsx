import {Form, FormikBag, FormikProps, withFormik} from 'formik';
import * as React from 'react';
import {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {compose} from 'recompose';
import withCaptcha, {CaptchaProps} from '../../../../shared/hocs/with-capcha';
import {authFormStyles} from '../../_styles';
import {TextInput} from '../../../common/inputs';
import {LoadingButton} from '../../../common/controls';
import AuthService from '../../../../services/auth.service';
import {SnackState} from '../../../../shared/contexts/snack-context';
import {withSnackContext} from '../../../../shared/hocs/with-snack/with-snack';
import {ForgotPasswordFormUtils, ForgotPasswordFormValues} from './_form';

type BaseProps = {
  onSuccess?: () => void;
};

type Props = FormikProps<ForgotPasswordFormValues> & CaptchaProps & SnackState & BaseProps;

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

const formik = withFormik<Props, ForgotPasswordFormValues>({
  mapPropsToValues: ForgotPasswordFormUtils.mapPropsToValues,
  validationSchema: ForgotPasswordFormUtils.validationSchema,
  validateOnMount: true,

  handleSubmit: (
    values: ForgotPasswordFormValues,
    {setSubmitting, props}: FormikBag<Props, ForgotPasswordFormValues>
  ) => {
    const {token, updateToken, handleCode, handleResponse} = props;

    const dto = ForgotPasswordFormUtils.mapValuesToDTO(values, token);

    AuthService.requestResetPasswordCode(dto)
      .then(() => {
        handleCode('auth.afterForgotPassword', 'info');
        props.onSuccess();
      })
      .catch((response) => {
        handleResponse(response);
        setSubmitting(false);
        updateToken();
      });
  },
});

export default compose<Props, BaseProps>(withCaptcha, withSnackContext, formik)(ForgotPasswordForm);
