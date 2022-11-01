import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {timeFormats} from '../../models/User';
import {FieldAttributes} from 'formik/dist/Field';
import FormikSelectInput from './FormikSelectInput';

type FormikGenderInputProps = FieldAttributes<any>;

const FormikTimeFormatInput = ({name, label}: FormikGenderInputProps) => {
  const {t, i18n} = useTranslation();

  const formatSelectMap = useMemo<Map<string, string>>(() => {
    const map = new Map<string, string>();
    timeFormats.forEach((f) => map.set(f, t('account:fields.timeFormat.options.' + f)));
    return map;
  }, [i18n.language]);

  return <FormikSelectInput name={name} label={label} options={formatSelectMap} />;
};

export default FormikTimeFormatInput;
