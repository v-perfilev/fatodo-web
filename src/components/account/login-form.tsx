import {Field, Form, FormikBag, FormikProps, withFormik} from 'formik';
import * as Yup from 'yup';
import {CheckboxWithLabel, TextField} from 'formik-material-ui';
import {Box, IconButton, InputAdornment} from '@material-ui/core';
import {login} from '../../store/actions/auth.actions';
import {connect, ConnectedProps} from 'react-redux';
import * as React from 'react';
import {FC, useState} from 'react';
import i18n from '../../shared/i18n';
import {authFormStyles} from './_styles';
import {Trans, useTranslation, withTranslation} from 'react-i18next';
import {VisibilityOnIcon} from '../common/icons/visibility-on-icon';
import {VisibilityOffIcon} from '../common/icons/visibility-off-icon';
import {compose} from 'recompose';
import LoadingButton from '../common/buttons/loading-button';
import AccountService from '../../services/account.service';
import {NotificationUtils} from '../../shared/utils/notification.utils';
import {enqueueSnackbar} from '../../store/actions/notification.actions';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Routes} from '../router';
import {ResponseUtils} from '../../shared/utils/response.utils';
import {SecurityUtils} from '../../shared/utils/security.utils';
import Link from '../common/link';

interface ComponentProps {
  onSuccess: () => void;
}

const mapDispatchToProps = {login, enqueueSnackbar};
const connector = connect(null, mapDispatchToProps);

type Props = ComponentProps & RouteComponentProps<{}> & FormikProps<any> & ConnectedProps<typeof connector>;

const LoginForm: FC<Props> = ({isValid, isSubmitting}: Props) => {
  const classes = authFormStyles();
  const {t} = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = (): void => setShowPassword((prevState) => !prevState);
  const handleMouseDownPassword = (event): void => event.preventDefault();

  return (
    <Box className={classes.root + ' '+ classes.minHeightBox}>
      <Form className={classes.form}>
        <Field component={TextField} type="text" name="user" label={t('form:fields.user.label')} fullWidth={true} />
        <Field
          component={TextField}
          type={showPassword ? 'text' : 'password'}
          name="password"
          label={t('form:fields.password.label')}
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
        <Box>
          <Field
            component={CheckboxWithLabel}
            type="checkbox"
            name="rememberMe"
            Label={{label: t('form:fields.rememberMe.label')}}
          />
        </Box>
        <LoadingButton
          type="submit"
          color="secondary"
          fullWidth={true}
          disabled={!isValid || isSubmitting}
          loading={isSubmitting}
        >
          <Trans i18nKey={'form:login.submit'} />
        </LoadingButton>
      </Form>
      <Box m={1} />
      <Link to={Routes.FORGOT_PASSWORD}>
        <Trans i18nKey={'buttons.forgotPassword'} />
      </Link>
    </Box>
  );
};

interface FormValues {
  user: string;
  password: string;
  rememberMe: boolean;
}

const formik = withFormik<Props, FormValues>({
  mapPropsToValues: () => ({
    user: '',
    password: '',
    rememberMe: false,
  }),

  mapPropsToErrors: () => ({
    user: '',
    password: '',
    rememberMe: '',
  }),

  validationSchema: Yup.object().shape({
    user: Yup.string().required(() => i18n.t('form:fields.user.required')),
    password: Yup.string().required(() => i18n.t('form:fields.password.required')),
  }),

  validateOnMount: true,

  handleSubmit: (values: FormValues, {setSubmitting, props}: FormikBag<Props, FormValues>) => {
    const data = {
      user: values.user,
      password: values.password,
    };

    const onSuccess = (): void => props.onSuccess();
    const onFailure = (): void => setSubmitting(false);

    AccountService.authenticate(data)
      .then((response) => {
        const token = SecurityUtils.parseTokenFromResponse(response);
        props.login(token, values.rememberMe, onSuccess, onFailure);
      })
      .catch((response) => {
        if (ResponseUtils.getFeedbackCode(response) === 'auth.notActivated') {
          props.history.push(Routes.NOT_ACTIVATED, {user: values.user});
        }
        NotificationUtils.handleFeedback(response, '*', ['auth.notActivated'], props.enqueueSnackbar);
        setSubmitting(false);
      });
  },
});

export default compose<ComponentProps>(withTranslation(), withRouter, connector, formik)(LoginForm);
