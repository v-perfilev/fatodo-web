import * as React from 'react';
import {FC, useState} from 'react';
import {Field, Form, FormikBag, FormikProps, withFormik} from 'formik';
import * as Yup from 'yup';
import {TextField} from 'formik-material-ui';
import {useTranslation} from 'react-i18next';
import AccountService from '../../services/account.service';
import {emailValidator, passwordValidator, usernameValidator} from './_validators';
import {authFormStyles} from './_styles';
import i18n from '../../shared/i18n';
import PasswordStrengthBar from './password-strength-bar';
import {IconButton, InputAdornment} from '@material-ui/core';
import {VisibilityOnIcon} from '../common/icons/visibility-on-icon';
import {VisibilityOffIcon} from '../common/icons/visibility-off-icon';
import {compose} from 'recompose';
import LoadingButton from '../common/inputs/loading-button';
import {Notification} from '../../shared/notification/notification';
import withCaptchaProvider from '../../shared/hoc/with-captcha-provider';
import withCaptcha, {CaptchaProps} from '../../shared/hoc/with-capcha';

type Props = FormikProps<any> &
  CaptchaProps & {
  onSuccess: () => void;
};

const RegistrationForm: FC<Props> = ({isValid, isSubmitting, values}: Props) => {
  const classes = authFormStyles();
  const {t} = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = (): void => setShowPassword((prevState) => !prevState);
  const handleMouseDownPassword = (event): void => event.preventDefault();

  return (
    <Form className={classes.root + ' ' + classes.minHeightBox + ' ' + classes.form}>
      <Field component={TextField} type="text" name="email" label={t('account:fields.email.label')} fullWidth={true} />
      <Field
        component={TextField}
        type="text"
        name="username"
        label={t('account:fields.username.label')}
        fullWidth={true}
      />
      <Field
        component={TextField}
        type={showPassword ? 'text' : 'password'}
        name="password"
        label={t('account:fields.password.label')}
        fullWidth={true}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={toggleShowPassword} onMouseDown={handleMouseDownPassword} size={'small'}>
                {showPassword ? <VisibilityOnIcon /> : <VisibilityOffIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
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
    const {token, updateToken} = props;
    const data = {
      email: values.email,
      username: values.username,
      password: values.password,
      language: i18n.language,
      token: token,
    };

    AccountService.register(data)
      .then(() => {
        Notification.handleSnack('auth.registered', 'info');
        props.onSuccess();
      })
      .catch((response) => {
        Notification.handleFeedback(response);
        setSubmitting(false);
        updateToken();
      });
  },
});

export default compose(withCaptchaProvider, withCaptcha, formik)(RegistrationForm);
