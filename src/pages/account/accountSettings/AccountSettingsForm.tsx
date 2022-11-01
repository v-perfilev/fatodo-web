import React, {memo, useMemo} from 'react';
import FVStack from '../../../components/boxes/FVStack';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import AuthSelectors from '../../../store/auth/authSelectors';
import {useTranslation} from 'react-i18next';
import {Formik, FormikHelpers} from 'formik';
import FHStack from '../../../components/boxes/FHStack';
import * as Yup from 'yup';
import {usernameChangeValidator} from '../../../shared/validators';
import {DateFormat, dateFormats, Gender, Language, TimeFormat, timeFormats, UserAccount} from '../../../models/User';
import {AuthActions} from '../../../store/auth/authActions';
import {useNavigate} from 'react-router-dom';
import {GroupRouteUtils} from '../../../routes/GroupRouter';
import LoadingButton from '../../../components/controls/LoadingButton';
import FormikLanguageInput from '../../../components/inputs/FormikLanguageInput';
import FormikTimezoneInput from '../../../components/inputs/FormikTimezoneInput';
import FormikTimeFormatInput from '../../../components/inputs/FormikTimeFormatInput';
import FormikDateFormatInput from '../../../components/inputs/FormikDateFormatInput';

export interface AccountSettingsFormValues {
  username: string;
  firstname: string;
  lastname: string;
  language: Language;
  gender: Gender;
  timezone: string;
  timeFormat: TimeFormat;
  dateFormat: DateFormat;
  imageFilename?: string;
  imageContent?: Blob;
}

const defaultAccountSettingsFormValues: Readonly<AccountSettingsFormValues> = {
  username: '',
  firstname: '',
  lastname: '',
  language: 'EN',
  gender: null,
  timezone: '',
  timeFormat: timeFormats[0],
  dateFormat: dateFormats[0],
  imageFilename: null,
  imageContent: null,
};

const initialValues = (account: UserAccount): AccountSettingsFormValues =>
  account
    ? {
        username: account.username,
        firstname: account.info.firstname,
        lastname: account.info.lastname,
        language: account.info.language,
        gender: account.info.gender,
        timezone: account.info.timezone,
        timeFormat: account.info.timeFormat,
        dateFormat: account.info.dateFormat,
        imageFilename: account.info.imageFilename,
        imageContent: null,
      }
    : defaultAccountSettingsFormValues;

const validationSchema = (account: UserAccount) =>
  Yup.object().shape({
    username: usernameChangeValidator(account.username).check(),
  });

const AccountSettingsForm = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(AuthSelectors.account);
  const navigate = useNavigate();
  const {t} = useTranslation();

  const goToGroupList = (): void => navigate(GroupRouteUtils.getListUrl());

  const values = useMemo(() => initialValues(account), [account]);
  const valSchema = useMemo(() => validationSchema(account), [account]);

  const addValueToForm = (formData: FormData, name: string, value: any, condition = true): void => {
    if (condition && value) {
      formData.append(name, value);
    }
  };

  const handleSubmit = (values: AccountSettingsFormValues, helpers: FormikHelpers<AccountSettingsFormValues>): void => {
    const formData = new FormData();
    addValueToForm(formData, 'id', account.id);
    addValueToForm(formData, 'username', values.username);
    addValueToForm(formData, 'firstname', values.firstname);
    addValueToForm(formData, 'lastname', values.lastname);
    addValueToForm(formData, 'language', values.language);
    addValueToForm(formData, 'gender', values.gender);
    addValueToForm(formData, 'timezone', values.timezone);
    addValueToForm(formData, 'timeFormat', values.timeFormat);
    addValueToForm(formData, 'dateFormat', values.dateFormat);
    addValueToForm(formData, 'imageFilename', values.imageFilename, !values.imageContent);
    addValueToForm(formData, 'imageContent', values.imageContent);

    dispatch(AuthActions.updateAccountThunk(formData))
      .unwrap()
      .then(() => goToGroupList())
      .catch(() => helpers.setSubmitting(false));
  };

  return (
    <Formik initialValues={values} validationSchema={valSchema} onSubmit={handleSubmit} enableReinitialize>
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
