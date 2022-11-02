import {Formik, FormikProps} from 'formik';
import React from 'react';
import {useTranslation} from 'react-i18next';
import * as Yup from 'yup';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import AuthSelectors from '../../../store/auth/authSelectors';
import {AuthActions} from '../../../store/auth/authActions';
import withCaptcha, {CaptchaProps} from '../../../shared/hocs/withCaptcha';
import {passwordRepeatValidator, passwordValidator} from '../../../shared/validators';
import LoadingButton from '../../../components/controls/LoadingButton';
import {ResetPasswordDTO} from '../../../models/dto/ResetPasswordDTO';
import FormikPasswordInput from '../../../components/inputs/FormikPasswordInput';
import {flowRight} from 'lodash';
import FVStack from '../../../components/boxes/FVStack';

export interface ResetPasswordFormValues {
  password: string;
  repeatPassword: string;
}

const defaultResetPasswordFormValues: Readonly<ResetPasswordFormValues> = {
  password: '',
  repeatPassword: '',
};

const validationSchema = Yup.object().shape({
  password: passwordValidator,
  repeatPassword: passwordRepeatValidator,
});

type ForgotPasswordFormProps = CaptchaProps & {
  code: string;
  onSuccess: () => void;
  onFailure: () => void;
};

const ResetPasswordForm = ({code, getToken, onSuccess, onFailure}: ForgotPasswordFormProps) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(AuthSelectors.loading);
  const {t} = useTranslation();

  const handleSubmit = async (formValues: ResetPasswordFormValues): Promise<void> => {
    dispatch(AuthActions.setLoading(true));
    const captchaToken = await getToken().catch(() => dispatch(AuthActions.setLoading(false)));
    const dto: ResetPasswordDTO = {
      code,
      password: formValues.password.trim(),
      token: captchaToken,
    };
    dispatch(AuthActions.resetPasswordThunk(dto))
      .unwrap()
      .then(() => onSuccess())
      .catch(() => onFailure());
  };

  return (
    <Formik
      initialValues={defaultResetPasswordFormValues}
      validationSchema={validationSchema}
      validateOnMount
      onSubmit={handleSubmit}
    >
      {(formikProps: FormikProps<ResetPasswordFormValues>) => (
        <FVStack>
          <FormikPasswordInput name="password" label={t('account:fields.password.label')} disabled={loading} />
          <FormikPasswordInput
            name="repeatPassword"
            label={t('account:fields.repeatPassword.label')}
            disabled={loading}
          />
          <LoadingButton
            type="submit"
            color="primary"
            fullWidth
            loading={loading}
            disabled={!formikProps.isValid || loading}
            onClick={formikProps.submitForm}
          >
            {t('account:resetPassword.submit')}
          </LoadingButton>
        </FVStack>
      )}
    </Formik>
  );
};

export default flowRight([withCaptcha])(ResetPasswordForm);
