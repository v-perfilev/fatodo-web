import * as React from 'react';
import {FC} from 'react';
import {Form, FormikBag, FormikProps, withFormik} from 'formik';
import {useTranslation} from 'react-i18next';
import AuthService from '../../../../services/auth.service';
import {authFormStyles} from '../../_styles';
import i18n from '../../../../shared/i18n';
import withCaptcha, {CaptchaProps} from '../../../../shared/hocs/with-capcha/with-capcha';
import {PasswordInput, TextInput} from '../../../../components/inputs';
import {LoadingButton} from '../../../../components/controls';
import {PasswordStrengthBar} from '../../password-strength-bar/PasswordStrengthBar';
import {SnackState} from '../../../../shared/contexts/snack-context';
import {withSnackContext} from '../../../../shared/hocs/with-snack/with-snack';
import {RegistrationFormUtils, RegistrationFormValues} from './_form';
import {flowRight} from 'lodash';
import {DateUtils} from '../../../../shared/utils/date.utils';

type BaseProps = {
  onSuccess: () => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
};

type Props = FormikProps<RegistrationFormValues> & CaptchaProps & SnackState & BaseProps;

const RegistrationForm: FC<Props> = ({isValid, isSubmitting, loading, values}: Props) => {
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
        disabled={!isValid || isSubmitting || loading}
        loading={isSubmitting || loading}
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

  handleSubmit: async (
    values: RegistrationFormValues,
    {setSubmitting, props}: FormikBag<Props, RegistrationFormValues>,
  ) => {
    const {getToken, onSuccess, handleCode, handleResponse, setLoading} = props;
    const timezone = DateUtils.getTimezone();
    const token = await getToken();
    const dto = RegistrationFormUtils.mapValuesToDTO(values, i18n.language, timezone, token);

    setLoading(true);
    AuthService.register(dto)
      .then(() => {
        handleCode('auth.registered', 'info');
        onSuccess();
      })
      .catch((response) => {
        handleResponse(response);
        setSubmitting(false);
        setLoading(false);
      });
  },
});

export default flowRight([withCaptcha, withSnackContext, formik])(RegistrationForm);
