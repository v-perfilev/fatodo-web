import * as React from 'react';
import {FC} from 'react';
import {Form, FormikBag, FormikProps, withFormik} from 'formik';
import {useTranslation} from 'react-i18next';
import AuthService from '../../../../services/auth.service';
import {authFormStyles} from '../../_styles';
import i18n from '../../../../shared/i18n';
import {compose} from 'recompose';
import withCaptcha, {CaptchaProps} from '../../../../shared/hocs/with-capcha';
import {PasswordInput, TextInput} from '../../../common/inputs';
import {LoadingButton} from '../../../common/controls';
import {PasswordStrengthBar} from '../../password-strength-bar';
import {SnackState} from '../../../../shared/contexts/snack-context';
import {withSnackContext} from '../../../../shared/hocs/with-snack/with-snack';
import {RegistrationFormUtils, RegistrationFormValues} from './_form';

type Props = FormikProps<RegistrationFormValues> &
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

const formik = withFormik<Props, RegistrationFormValues>({
  mapPropsToValues: RegistrationFormUtils.mapPropsToValues,
  validationSchema: RegistrationFormUtils.validationSchema,
  validateOnMount: true,

  handleSubmit: (values: RegistrationFormValues, {setSubmitting, props}: FormikBag<Props, RegistrationFormValues>) => {
    const {token, updateToken, onSuccess, handleCode, handleResponse} = props;

    const dto = RegistrationFormUtils.mapValuesToDTO(values, i18n.language, token);

    AuthService.register(dto)
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
