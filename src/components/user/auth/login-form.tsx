import {Field, Form, FormikBag, FormikProps, withFormik} from 'formik';
import * as Yup from 'yup';
import {CheckboxWithLabel} from 'formik-material-ui';
import {Box} from '@material-ui/core';
import {login, requestAccountData} from '../../../store/actions/auth.actions';
import {connect, ConnectedProps} from 'react-redux';
import * as React from 'react';
import {FC} from 'react';
import i18n from '../../../shared/i18n';
import {authFormStyles} from '../common/_styles';
import {useTranslation} from 'react-i18next';
import {compose} from 'recompose';
import AccountService from '../../../services/account.service';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Routes} from '../../router';
import {ResponseUtils} from '../../../shared/utils/response.utils';
import {SecurityUtils} from '../../../shared/utils/security.utils';
import withCaptcha, {CaptchaProps} from '../../../shared/hoc/with-capcha';
import {TextInput} from '../../common/inputs/text-input';
import {PasswordInput} from '../../common/inputs/password-input';
import {LoadingButton} from '../../common/controls/loading-button';
import {Link} from '../../common/controls/link';
import {withSnackContext} from '../../../shared/hoc/with-snack';
import {SnackState} from '../../../shared/contexts/snack-context';

const mapDispatchToProps = {login, requestAccountData};
const connector = connect(null, mapDispatchToProps);

type Props = RouteComponentProps &
  FormikProps<any> &
  ConnectedProps<typeof connector> &
  CaptchaProps &
  SnackState & {
  onSuccess: () => void;
};

const LoginForm: FC<Props> = ({isValid, isSubmitting}: Props) => {
  const classes = authFormStyles();
  const {t} = useTranslation();

  return (
    <Box className={classes.root + ' ' + classes.minHeightBox}>
      <Form className={classes.form}>
        <TextInput name="user" label={t('account:fields.user.label')} required />
        <PasswordInput name="password" label={t('account:fields.password.label')} />
        <Box>
          <Field
            component={CheckboxWithLabel}
            type="checkbox"
            name="rememberMe"
            Label={{label: t('account:fields.rememberMe.label')}}
          />
        </Box>
        <LoadingButton
          type="submit"
          color="secondary"
          fullWidth
          disabled={!isValid || isSubmitting}
          loading={isSubmitting}
        >
          {t('account:login.submit')}
        </LoadingButton>
      </Form>
      <Box m={1} />
      <Link to={Routes.FORGOT_PASSWORD}>{t('buttons.forgotPassword')}</Link>
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
    rememberMe: false
  }),

  mapPropsToErrors: () => ({
    user: '',
    password: '',
    rememberMe: ''
  }),

  validationSchema: Yup.object().shape({
    user: Yup.string().required(() => i18n.t('account:fields.user.required')),
    password: Yup.string().required(() => i18n.t('account:fields.password.required'))
  }),

  validateOnMount: true,

  handleSubmit: (values: FormValues, {setSubmitting, props}: FormikBag<Props, FormValues>) => {
    const {login, requestAccountData, history, onSuccess, token, updateToken, handleResponse} = props;

    const data = {
      user: values.user,
      password: values.password,
      token: token
    };

    const onFailure = (): void => setSubmitting(false);

    AccountService.authenticate(data)
      .then((response) => {
        const token = SecurityUtils.parseTokenFromResponse(response);
        login(token, values.rememberMe);
        requestAccountData(onSuccess, onFailure);
      })
      .catch((response) => {
        if (ResponseUtils.getFeedbackCode(response) === 'auth.notActivated') {
          history.push(Routes.NOT_ACTIVATED, {user: values.user});
        } else {
          handleResponse(response, '*', ['auth.notActivated']);
          setSubmitting(false);
          updateToken();
        }
      });
  }
});

export default compose(withRouter, withCaptcha, withSnackContext, connector, formik)(LoginForm);
