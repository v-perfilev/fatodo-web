import React, {useMemo} from 'react';
import {languages} from '../../shared/i18n';
import {FieldAttributes} from 'formik/dist/Field';
import FormikSelectInput from './FormikSelectInput';

type FormikLanguageInputProps = FieldAttributes<any>;

const FormikLanguageInput = ({name, label}: FormikLanguageInputProps) => {
  const languageSelectMap = useMemo<Map<string, string>>(() => {
    const map = new Map<string, string>();
    languages.forEach((l) => map.set(l.code.toUpperCase(), l.name));
    return map;
  }, []);

  return <FormikSelectInput name={name} label={label} options={languageSelectMap} />;
};

export default FormikLanguageInput;
