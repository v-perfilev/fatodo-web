import {Field, Form, FormikBag, FormikProps, withFormik} from 'formik';
import * as Yup from 'yup';
import {TextField} from 'formik-material-ui';
import * as React from 'react';
import {FC, useState} from 'react';
import {authFormStyles} from './_styles';
import {Trans, useTranslation, withTranslation} from 'react-i18next';
import {compose} from 'recompose';
import AccountService from '../../services/account.service';
import PasswordStrengthBar from './password-strength-bar';
import {passwordValidator, repeatPasswordValidator} from './_validators';
import {IconButton, InputAdornment} from '@material-ui/core';
import {VisibilityOnIcon} from '../common/icons/visibility-on-icon';
import {VisibilityOffIcon} from '../common/icons/visibility-off-icon';
import LoadingButton from '../common/buttons/loading-button';
import {enqueueSnackbar} from '../../store/actions/notification.actions';
import {connect, ConnectedProps} from 'react-redux';
import {NotificationUtils} from '../../shared/utils/notification.utils';
import withCaptcha, {CaptchaProps} from '../../shared/hoc/with-capcha';
import withCaptchaProvider from '../../shared/hoc/with-captcha-provider';

const mapDispatchToProps = {enqueueSnackbar};
const connector = connect(null, mapDispatchToProps);

type Props = FormikProps<any> & ConnectedProps<typeof connector> & CaptchaProps & {
  code: string;
  onSuccess: () => void;
  onFailure: (status: number) => void;
};

const ResetPasswordForm: FC<Props> = ({isValid, isSubmitting, values}: Props) => {
  const classes = authFormStyles();
  const {t} = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const toggleShowPassword = (): void => setShowPassword((prevState) => !prevState);
  const toggleShowRepeatPassword = (): void => setShowRepeatPassword((prevState) => !prevState);
  const handleMouseDownPassword = (event): void => event.preventDefault();

  return (
    <Form className={classes.root + ' ' + classes.form}>
      <Field
        component={TextField}
        type={showPassword ? 'text' : 'password'}
        name="password"
        label={t('form:fields.newPassword.label')}
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
      <Field
        component={TextField}
        type={showRepeatPassword ? 'text' : 'password'}
        name="repeatPassword"
        label={t('form:fields.repeatPassword.label')}
        fullWidth={true}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={toggleShowRepeatPassword} onMouseDown={handleMouseDownPassword} size={'small'}>
                {showRepeatPassword ? <VisibilityOnIcon /> : <VisibilityOffIcon />}
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
        <Trans i18nKey={'form:resetPassword.submit'} />
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
    const data = {
      code: props.code,
      password: values.password,
      token: props.token,
    };
    AccountService.resetPassword(data)
      .then(() => {
        NotificationUtils.handleSnack('auth.afterResetPassword', 'info', props.enqueueSnackbar);
        props.onSuccess();
      })
      .catch((response) => {
        NotificationUtils.handleFeedback(response, '*', '', props.enqueueSnackbar);
        setSubmitting(false);
        props.onFailure(response?.status);
      });
  },
});

export default compose(
  withTranslation(),
  withCaptchaProvider,
  withCaptcha,
  connector,
  formik,
)(ResetPasswordForm);
