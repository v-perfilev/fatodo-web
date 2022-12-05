import React, {memo, useMemo} from 'react';
import FVStack from '../../../components/boxes/FVStack';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import AuthSelectors from '../../../store/auth/authSelectors';
import {useTranslation} from 'react-i18next';
import {Formik, FormikHelpers} from 'formik';
import FHStack from '../../../components/boxes/FHStack';
import {DateFormat, dateFormats, Language, TimeFormat, timeFormats, UserAccount} from '../../../models/User';
import {AuthActions} from '../../../store/auth/authActions';
import {useNavigate} from 'react-router-dom';
import {GroupRouteUtils} from '../../../routes/GroupRouter';
import LoadingButton from '../../../components/controls/LoadingButton';
import FormikLanguageInput from '../../../components/inputs/FormikLanguageInput';
import FormikTimezoneInput from '../../../components/inputs/FormikTimezoneInput';
import FormikTimeFormatInput from '../../../components/inputs/FormikTimeFormatInput';
import FormikDateFormatInput from '../../../components/inputs/FormikDateFormatInput';
import FormikSwitchInput from '../../../components/inputs/FormikSwitchInput';
import PageSubtitle from '../../../components/layouts/PageSubtitle';

export interface AccountSettingsFormValues {
  language: Language;
  timezone: string;
  timeFormat: TimeFormat;
  dateFormat: DateFormat;
  emailReminders: boolean;
}

const defaultAccountSettingsFormValues: Readonly<AccountSettingsFormValues> = {
  language: 'EN',
  timezone: '',
  timeFormat: timeFormats[0],
  dateFormat: dateFormats[0],
  emailReminders: true,
};

const initialValues = (account: UserAccount): AccountSettingsFormValues =>
  account ? account.settings : defaultAccountSettingsFormValues;

const AccountSettingsForm = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(AuthSelectors.account);
  const navigate = useNavigate();
  const {t} = useTranslation();

  const goToGroupList = (): void => navigate(GroupRouteUtils.getListUrl());

  const values = useMemo(() => initialValues(account), [account]);

  const handleSubmit = (values: AccountSettingsFormValues, helpers: FormikHelpers<AccountSettingsFormValues>): void => {
    dispatch(AuthActions.updateAccountSettingsThunk(values))
      .unwrap()
      .then(() => goToGroupList())
      .catch(() => helpers.setSubmitting(false));
  };

  return (
    <Formik initialValues={values} onSubmit={handleSubmit} enableReinitialize>
      {(formikProps) => (
        <FVStack>
          <FormikLanguageInput
            name="language"
            label={t('account:fields.language.label')}
            disabled={formikProps.isSubmitting}
          />
          <FormikTimezoneInput
            name="timezone"
            label={t('account:fields.timezone.label')}
            disabled={formikProps.isSubmitting}
          />
          <FormikTimeFormatInput
            name="timeFormat"
            label={t('account:fields.timeFormat.label')}
            disabled={formikProps.isSubmitting}
          />
          <FormikDateFormatInput
            name="dateFormat"
            label={t('account:fields.dateFormat.label')}
            disabled={formikProps.isSubmitting}
          />

          <PageSubtitle subtitle={t('account:settings.notificationsSubtitle')} />

          <FormikSwitchInput
            name="emailReminders"
            label={t('account:fields.emailReminders.label')}
            disabled={formikProps.isSubmitting}
          />

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

export default memo(AccountSettingsForm);
