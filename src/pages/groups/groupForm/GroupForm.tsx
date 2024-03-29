import React from 'react';
import {Formik, FormikHelpers} from 'formik';
import {Group} from '../../../models/Group';
import * as Yup from 'yup';
import i18n from '../../../shared/i18n';
import FormikTextInput from '../../../components/inputs/FormikTextInput';
import {useTranslation} from 'react-i18next';
import FVStack from '../../../components/boxes/FVStack';
import FHStack from '../../../components/boxes/FHStack';
import {ColorScheme} from '../../../shared/themes/colors';
import {Button} from '@mui/material';
import LoadingButton from '../../../components/controls/LoadingButton';
import FormikThemeSelect from '../../../components/inputs/FormikThemeSelect';
import FormikImageUpload from '../../../components/inputs/formikImageUpload/FormikImageUpload';

export interface GroupFormValues {
  title: string;
  color: ColorScheme;
  imageFilename?: string;
  imageContent?: Blob;
}

const defaultGroupFormValues: Readonly<GroupFormValues> = {
  title: '',
  color: 'turquoise',
  imageFilename: null,
  imageContent: null,
};

const initialValues = (group: Group): GroupFormValues =>
  group
    ? {
        title: group.title,
        color: group.color,
        imageFilename: group.imageFilename,
        imageContent: null,
      }
    : defaultGroupFormValues;

const validationSchema = Yup.object().shape({
  title: Yup.string().required(() => i18n.t('group:fields.title.required')),
  color: Yup.string().required(() => i18n.t('group:fields.color.required')),
});

type GroupFormProps = {
  group?: Group;
  request: (formData: FormData, stopSubmitting: () => void) => void;
  cancel: () => void;
};

const GroupForm = ({group, request, cancel}: GroupFormProps) => {
  const {t} = useTranslation();

  const addValueToForm = (formData: FormData, name: string, value: any, condition = true): void => {
    if (condition && value) {
      formData.append(name, value);
    }
  };

  const mapValuesToFormData = (values: GroupFormValues, group: Group): FormData => {
    const formData = new FormData();
    addValueToForm(formData, 'id', group?.id);
    addValueToForm(formData, 'title', values.title);
    addValueToForm(formData, 'color', values.color);
    addValueToForm(formData, 'imageFilename', values.imageFilename, !values.imageContent);
    addValueToForm(formData, 'imageContent', values.imageContent);
    return formData;
  };

  const handleSubmit = (values: GroupFormValues, helpers: FormikHelpers<GroupFormValues>) => {
    const formData = mapValuesToFormData(values, group);
    request(formData, () => helpers.setSubmitting(false));
  };

  return (
    <Formik
      initialValues={initialValues(group)}
      validationSchema={validationSchema}
      validateOnMount
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <FVStack>
          <FormikTextInput name="title" label={t('group:fields.title.label')} disabled={formikProps.isSubmitting} />
          <FormikThemeSelect name="color" label={t('group:fields.color.label')} disabled={formikProps.isSubmitting} />
          <FormikImageUpload
            filenameName="imageFilename"
            contentName="imageContent"
            label={t('group:fields.image.label')}
            preview
            crop
          />
          <FHStack justifyContent="flex-end">
            <Button variant="text" color="secondary" disabled={formikProps.isSubmitting} onClick={cancel}>
              {t('group:actions.cancel')}
            </Button>
            <LoadingButton
              variant="text"
              color="primary"
              loading={formikProps.isSubmitting}
              disabled={!formikProps.isValid || formikProps.isSubmitting}
              onClick={formikProps.submitForm}
            >
              {t('group:actions.save')}
            </LoadingButton>
          </FHStack>
        </FVStack>
      )}
    </Formik>
  );
};

export default GroupForm;
