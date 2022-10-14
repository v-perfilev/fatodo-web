import React from 'react';
import {Formik, FormikProps} from 'formik';
import {flowRight} from 'lodash';
import withCaptcha, {CaptchaProps} from '../../../shared/hocs/withCaptcha';
import * as Yup from 'yup';
import i18n from '../../../shared/i18n';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import AuthSelectors from '../../../store/auth/authSelectors';
import {useTranslation} from 'react-i18next';
import {AuthActions} from '../../../store/auth/authActions';
import {LoginDTO} from '../../../models/dto/LoginDTO';
import {Stack, SxProps} from '@mui/material';
import FormikTextInput from '../../../components/inputs/FormikTextInput';
import LoadingButton from '../../../components/controls/LoadingButton';
import FormikPasswordInput from '../../../components/inputs/FormikPasswordInput';
import FormikCheckboxInput from '../../../components/inputs/FormikCheckboxInput';

type SignInFormValues = {
  user: string;
  password: string;
  token: string;
  rememberMe: boolean;
};

const defaultSignInFormValues: Readonly<SignInFormValues> = {
  user: '',
  password: '',
  token: '',
  rememberMe: false,
};

const signInValidationScheme = Yup.object().shape({
  user: Yup.string().required(() => i18n.t('account:fields.user.required')),
  password: Yup.string().required(() => i18n.t('account:fields.password.required')),
});

type SignInFormProps = CaptchaProps;

const SignInForm = ({getToken}: SignInFormProps) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(AuthSelectors.loading);
  const {t} = useTranslation();

  const handleSubmit = async (formValues: SignInFormValues): Promise<void> => {
    dispatch(AuthActions.setLoading(true));
    const captchaToken = await getToken().catch(() => dispatch(AuthActions.setLoading(false)));
    const dto: LoginDTO = {
      user: formValues.user.trim(),
      password: formValues.password.trim(),
      token: captchaToken,
    };
    // TODO handle redirect to not activated
    dispatch(AuthActions.authenticateThunk({dto, rememberMe: formValues.rememberMe}));
  };

  return (
    <Formik
      initialValues={defaultSignInFormValues}
      validationSchema={signInValidationScheme}
      validateOnMount
      onSubmit={handleSubmit}
    >
      {(formikProps: FormikProps<SignInFormValues>) => (
        <Stack sx={containerStyles} spacing={2} alignItems="center">
          <FormikTextInput name="user" label={t('account:fields.user.label')} disabled={loading} />
          <FormikPasswordInput name="password" label={t('account:fields.password.label')} disabled={loading} />
          <FormikCheckboxInput name="rememberMe" Label={{label: t('account:fields.rememberMe.label')}} />
          <LoadingButton
            type="submit"
            color="secondary"
            fullWidth
            loading={loading}
            disabled={!formikProps.isValid || loading}
          >
            {t('account:login.submit')}
          </LoadingButton>
        </Stack>
      )}
    </Formik>
  );
};

const containerStyles: SxProps = {
  width: '100%',
  minHeight: 286,
};

export default flowRight([withCaptcha])(SignInForm);
