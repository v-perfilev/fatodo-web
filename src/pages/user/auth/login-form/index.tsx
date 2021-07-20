import {Field, Form, FormikBag, FormikProps, withFormik} from 'formik';
import {CheckboxWithLabel} from 'formik-material-ui';
import {Box} from '@material-ui/core';
import {login, requestAccountData} from '../../../../store/actions/auth.actions';
import {connect, ConnectedProps} from 'react-redux';
import * as React from 'react';
import {FC} from 'react';
import {authFormStyles} from '../../_styles';
import {useTranslation} from 'react-i18next';
import AuthService from '../../../../services/auth.service';
import {RouteComponentProps, withRouter} from 'react-router-dom';
import {Routes} from '../../../router';
import {ResponseUtils} from '../../../../shared/utils/response.utils';
import {SecurityUtils} from '../../../../shared/utils/security.utils';
import {CaptchaProps, withCaptcha, withCaptchaProvider} from '../../../../shared/hocs/with-capcha';
import {PasswordInput, TextInput} from '../../../../components/inputs';
import {Link, LoadingButton} from '../../../../components/controls';
import {withSnackContext} from '../../../../shared/hocs/with-snack/with-snack';
import {SnackState} from '../../../../shared/contexts/snack-context';
import {LoginFormUtils, LoginFormValues} from './_form';
import {flowRight} from 'lodash';

const mapDispatchToProps = {login, requestAccountData};
const connector = connect(null, mapDispatchToProps);

type BaseProps = {
  onSuccess: () => void;
};

type Props = RouteComponentProps &
  FormikProps<LoginFormValues> &
  ConnectedProps<typeof connector> &
  CaptchaProps &
  SnackState &
  BaseProps;

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

const formik = withFormik<Props, LoginFormValues>({
  mapPropsToValues: LoginFormUtils.mapPropsToValues,
  validationSchema: LoginFormUtils.validationSchema,
  validateOnMount: true,

  handleSubmit: async (values: LoginFormValues, {setSubmitting, props}: FormikBag<Props, LoginFormValues>) => {
    const {login, requestAccountData, history, onSuccess, getToken, handleResponse} = props;
    const token = await getToken();
    const dto = LoginFormUtils.mapValuesToDTO(values, token);

    const onFailure = (): void => setSubmitting(false);

    AuthService.authenticate(dto)
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
        }
      });
  },
});

export default flowRight([withRouter, withCaptchaProvider, withCaptcha, withSnackContext, connector, formik])(
  LoginForm
);
