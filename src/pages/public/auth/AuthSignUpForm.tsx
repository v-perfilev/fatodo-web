import React from 'react';
import {Formik, FormikProps} from 'formik';
import {useTranslation} from 'react-i18next';
import {flowRight} from 'lodash';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import AuthSelectors from '../../../store/auth/authSelectors';
import {AuthActions} from '../../../store/auth/authActions';
import {emailValidator, passwordValidator, usernameValidator} from '../../../shared/validators';
import * as Yup from 'yup';
import withCaptcha, {CaptchaProps} from '../../../shared/hocs/withCaptcha';
import i18n from '../../../shared/i18n';
import {DateUtils} from '../../../shared/utils/DateUtils';
import {RegistrationDTO} from '../../../models/dto/RegistrationDTO';
import {SxProps} from '@mui/material';
import FormikTextInput from '../../../components/inputs/FormikTextInput';
import FormikPasswordInput from '../../../components/inputs/FormikPasswordInput';
import LoadingButton from '../../../components/controls/LoadingButton';
import PasswordStrengthBar from '../../../components/inputs/PasswordStrengthBar';
import FVStack from '../../../components/boxes/FVStack';

export interface SignUpFormValues {
  email: string;
  username: string;
  password: string;
}

const defaultSignUpFormValues: Readonly<SignUpFormValues> = {
  email: '',
  username: '',
  password: '',
};

const validationSchema = Yup.object().shape({
  email: emailValidator.check(),
  username: usernameValidator.check(),
  password: passwordValidator,
});

type SignUpFormProps = CaptchaProps & {
  onSuccess: () => void;
};

const SignUpForm = ({getToken, onSuccess}: SignUpFormProps) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(AuthSelectors.loading);
  const {t} = useTranslation();

  const handleSubmit = async (formValues: SignUpFormValues): Promise<void> => {
    dispatch(AuthActions.setLoading(true));
    const captchaToken = await getToken().catch(() => dispatch(AuthActions.setLoading(false)));
    const language = i18n.language;
    const timezone = DateUtils.getTimezone();

    const dto: RegistrationDTO = {
      email: formValues.email.trim(),
      username: formValues.username.trim(),
      password: formValues.password.trim(),
      language,
      timezone,
      token: captchaToken,
    };
    dispatch(AuthActions.registerThunk(dto))
      .unwrap()
      .then(() => onSuccess());
  };

  return (
    <Formik
      initialValues={defaultSignUpFormValues}
      validationSchema={validationSchema}
      validateOnMount
      onSubmit={handleSubmit}
    >
      {(formikProps: FormikProps<SignUpFormValues>) => (
        <FVStack sx={containerStyles}>
          <FormikTextInput name="email" label={t('account:fields.email.label')} disabled={loading} />
          <FormikTextInput name="username" label={t('account:fields.username.label')} disabled={loading} />
          <FormikPasswordInput name="password" label={t('account:fields.password.label')} disabled={loading} />
          <PasswordStrengthBar password={formikProps.values.password} />
          <LoadingButton
            color="primary"
            fullWidth
            loading={loading}
            disabled={!formikProps.isValid || loading}
            onClick={formikProps.submitForm}
          >
            {t('account:register.submit')}
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

export default flowRight([withCaptcha])(SignUpForm);
