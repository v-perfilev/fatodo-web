import React, {useMemo} from 'react';
import {useTranslation} from 'react-i18next';
import {dateFormats} from '../../models/User';
import {FieldAttributes} from 'formik/dist/Field';
import FormikSelectInput from './FormikSelectInput';

type FormikGenderInputProps = FieldAttributes<any>;

const FormikDateFormatInput = ({name, label}: FormikGenderInputProps) => {
  const {t, i18n} = useTranslation();

  const formatSelectMap = useMemo<Map<string, string>>(() => {
    const map = new Map<string, string>();
    dateFormats.forEach((f) => map.set(f, t('account:fields.dateFormat.options.' + f)));
    return map;
  }, [i18n.language]);

  return <FormikSelectInput name={name} label={label} options={formatSelectMap} />;
};

export default FormikDateFormatInput;
