import React, {ReactElement, useMemo} from 'react';
import ThemeView from '../views/ThemeView';
import {colorSchemes} from '../../shared/themes/colors';
import FormikSelectInput from './FormikSelectInput';
import {FieldAttributes} from 'formik/dist/Field';

type FormikThemeSelectProps = FieldAttributes<any>;

const FormikThemeSelect = ({name, label}: FormikThemeSelectProps) => {
  const themeSelectMap = useMemo<Map<string, ReactElement>>(() => {
    const map = new Map<string, any>();
    colorSchemes.forEach((s) => map.set(s, <ThemeView color={s} />));
    return map;
  }, []);

  return <FormikSelectInput name={name} label={label} options={themeSelectMap} />;
};

export default FormikThemeSelect;
