import React, {memo} from 'react';
import FVStack from '../../../components/boxes/FVStack';
import {useAppDispatch} from '../../../store/store';
import {AuthActions} from '../../../store/auth/authActions';
import {useTranslation} from 'react-i18next';
import {Formik, FormikHelpers} from 'formik';
import FHStack from '../../../components/boxes/FHStack';
import * as Yup from 'yup';
import {passwordValidator} from '../../../shared/validators';
import i18n from '../../../shared/i18n';
import {ChangePasswordDTO} from '../../../models/dto/ChangePasswordDTO';
import FormikPasswordInput from '../../../components/inputs/FormikPasswordInput';
import PasswordStrengthBar from '../../../components/inputs/PasswordStrengthBar';
import LoadingButton from '../../../components/controls/LoadingButton';
import {useNavigate} from 'react-router-dom';
import {GroupRouteUtils} from '../../../routes/GroupRouter';

export interface ChangePasswordFormValues {
  oldPassword: string;
  newPassword: string;
}

const defaultChangePasswordFormValues: Readonly<ChangePasswordFormValues> = {
  oldPassword: '',
  newPassword: '',
};

const validationSchema = Yup.object().shape({
  oldPassword: Yup.string().required(() => i18n.t('account:fields.password.required')),
  newPassword: passwordValidator,
});

const AccountChangePasswordForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {t} = useTranslation();

  const goToGroupList = (): void => navigate(GroupRouteUtils.getListUrl());

  const handleSubmit = (values: ChangePasswordFormValues, helpers: FormikHelpers<ChangePasswordFormValues>): void => {
    const dto: ChangePasswordDTO = {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    };

    dispatch(AuthActions.changePasswordThunk(dto))
      .then(() => goToGroupList())
      .catch(() => helpers.setSubmitting(false));
  };

  return (
    <Formik initialValues={defaultChangePasswordFormValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {(formikProps) => (
        <FVStack>
          <FormikPasswordInput
            name="oldPassword"
            label={t('account:fields.oldPassword.label')}
            disabled={formikProps.isSubmitting}
          />
          <FormikPasswordInput
            name="newPassword"
            label={t('account:fields.newPassword.label')}
            disabled={formikProps.isSubmitting}
          />
          <PasswordStrengthBar password={formikProps.values.newPassword} />

          <FHStack flexGrow={0} justifyContent="flex-end">
            <LoadingButton
              variant="text"
              color="primary"
              loading={formikProps.isSubmitting}
              disabled={!formikProps.isValid || formikProps.isSubmitting}
              onClick={formikProps.submitForm}
            >
              {t('account:actions.save')}
            </LoadingButton>
          </FHStack>
        </FVStack>
      )}
    </Formik>
  );
};

export default memo(AccountChangePasswordForm);
