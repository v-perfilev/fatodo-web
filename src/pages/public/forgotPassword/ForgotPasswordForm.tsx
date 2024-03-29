import {Formik, FormikProps} from 'formik';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {flowRight} from 'lodash';
import * as Yup from 'yup';
import i18n from '../../../shared/i18n';
import withCaptcha, {CaptchaProps} from '../../../shared/hocs/withCaptcha';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import AuthSelectors from '../../../store/auth/authSelectors';
import {AuthActions} from '../../../store/auth/authActions';
import {ForgotPasswordDTO} from '../../../models/dto/ForgotPasswordDTO';
import LoadingButton from '../../../components/controls/LoadingButton';
import FormikTextInput from '../../../components/inputs/FormikTextInput';
import FVStack from '../../../components/boxes/FVStack';

export interface ForgotPasswordFormValues {
  user: string;
}

const defaultForgotPasswordFormValues: Readonly<ForgotPasswordFormValues> = {
  user: '',
};

const validationSchema = Yup.object().shape({
  user: Yup.string().required(() => i18n.t('account:fields.user.required')),
});

type ForgotPasswordFormProps = CaptchaProps & {
  onSuccess: () => void;
};

const ForgotPasswordForm = ({getToken, onSuccess}: ForgotPasswordFormProps) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector(AuthSelectors.loading);
  const {t} = useTranslation();

  const handleSubmit = async (formValues: ForgotPasswordFormValues): Promise<void> => {
    dispatch(AuthActions.setLoading(true));
    const captchaToken = await getToken().catch(() => dispatch(AuthActions.setLoading(false)));
    const dto: ForgotPasswordDTO = {
      user: formValues.user.trim(),
      token: captchaToken,
    };
    dispatch(AuthActions.forgotPasswordThunk(dto))
      .unwrap()
      .then(() => onSuccess());
  };

  return (
    <Formik
      initialValues={defaultForgotPasswordFormValues}
      validationSchema={validationSchema}
      validateOnMount
      onSubmit={handleSubmit}
    >
      {(formikProps: FormikProps<ForgotPasswordFormValues>) => (
        <FVStack width="100%">
          <FormikTextInput name="user" label={t('account:fields.user.label')} isDisabled={loading} />
          <LoadingButton
            color="primary"
            fullWidth
            loading={loading}
            disabled={!formikProps.isValid || loading}
            onClick={formikProps.submitForm}
          >
            {t('account:forgotPassword.submit')}
          </LoadingButton>
        </FVStack>
      )}
    </Formik>
  );
};

export default flowRight([withCaptcha])(ForgotPasswordForm);
