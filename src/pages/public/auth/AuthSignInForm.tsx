import React, {useEffect, useState} from 'react';
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
import {SxProps} from '@mui/material';
import FormikTextInput from '../../../components/inputs/FormikTextInput';
import LoadingButton from '../../../components/controls/LoadingButton';
import FormikPasswordInput from '../../../components/inputs/FormikPasswordInput';
import FormikCheckboxInput from '../../../components/inputs/FormikCheckboxInput';
import {useNavigate} from 'react-router-dom';
import {RootRoutes} from '../../../routes/RootRouter';
import FVStack from '../../../components/boxes/FVStack';

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
  const error = useAppSelector(AuthSelectors.error);
  const navigate = useNavigate();
  const {t} = useTranslation();
  const [user, setUser] = useState<string>(undefined);

  const redirectToNotActivated = (): void => navigate(RootRoutes.NOT_ACTIVATED, {state: {user}});

  const handleSubmit = async (formValues: SignInFormValues): Promise<void> => {
    dispatch(AuthActions.setLoading(true));
    setUser(formValues.user.trim());
    const captchaToken = await getToken().catch(() => dispatch(AuthActions.setLoading(false)));
    const dto: LoginDTO = {
      user: formValues.user.trim(),
      password: formValues.password.trim(),
      token: captchaToken,
    };
    dispatch(AuthActions.authenticateThunk({dto, rememberMe: formValues.rememberMe}));
  };

  useEffect(() => {
    error === 'auth.notActivated' && redirectToNotActivated();
  }, [error]);

  return (
    <Formik
      initialValues={defaultSignInFormValues}
      validationSchema={signInValidationScheme}
      validateOnMount
      onSubmit={handleSubmit}
    >
      {(formikProps: FormikProps<SignInFormValues>) => (
        <FVStack sx={containerStyles}>
          <FormikTextInput name="user" label={t('account:fields.user.label')} disabled={loading} />
          <FormikPasswordInput name="password" label={t('account:fields.password.label')} disabled={loading} />
          <FormikCheckboxInput name="rememberMe" Label={{label: t('account:fields.rememberMe.label')}} />
          <LoadingButton
            color="primary"
            fullWidth
            loading={loading}
            disabled={!formikProps.isValid || loading}
            onClick={formikProps.submitForm}
          >
            {t('account:login.submit')}
          </LoadingButton>
        </FVStack>
      )}
    </Formik>
  );
};

const containerStyles: SxProps = {
  width: '100%',
  minHeight: 286,
};

export default flowRight([withCaptcha])(SignInForm);
