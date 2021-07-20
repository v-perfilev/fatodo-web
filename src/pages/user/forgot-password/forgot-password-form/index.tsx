import {Form, FormikBag, FormikProps, withFormik} from 'formik';
import * as React from 'react';
import {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {CaptchaProps, withCaptcha, withCaptchaProvider} from '../../../../shared/hocs/with-capcha';
import {authFormStyles} from '../../_styles';
import {TextInput} from '../../../../components/inputs';
import {LoadingButton} from '../../../../components/controls';
import AuthService from '../../../../services/auth.service';
import {SnackState} from '../../../../shared/contexts/snack-context';
import {withSnackContext} from '../../../../shared/hocs/with-snack/with-snack';
import {ForgotPasswordFormUtils, ForgotPasswordFormValues} from './_form';
import {flowRight} from 'lodash';

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

  handleSubmit: async (
    values: ForgotPasswordFormValues,
    {setSubmitting, props}: FormikBag<Props, ForgotPasswordFormValues>
  ) => {
    const {getToken, handleCode, handleResponse} = props;
    const token = await getToken();
    const dto = ForgotPasswordFormUtils.mapValuesToDTO(values, token);

    AuthService.requestResetPasswordCode(dto)
      .then(() => {
        handleCode('auth.afterForgotPassword', 'info');
        props.onSuccess();
      })
      .catch((response) => {
        handleResponse(response);
        setSubmitting(false);
      });
  },
});

export default flowRight([withCaptchaProvider, withCaptcha, withSnackContext, formik])(ForgotPasswordForm);
