import React, {useMemo} from 'react';
import {FieldAttributes} from 'formik';
import {useTranslation} from 'react-i18next';
import {genders} from '../../models/User';
import FormikRadioInput from './FormikRadioInput';

type FormikGenderInputProps = FieldAttributes<any>;

const FormikGenderInput = (props: FormikGenderInputProps) => {
  const {t, i18n} = useTranslation();

  const genderSelectMap = useMemo<Map<string, string>>(() => {
    const map = new Map<string, string>();
    genders.forEach((g) => map.set(g, t('account:fields.gender.options.' + g)));
    return map;
  }, [i18n.language]);

  return <FormikRadioInput options={genderSelectMap} {...props} />;
};

export default FormikGenderInput;
