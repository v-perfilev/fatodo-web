import React, {ReactElement, useMemo} from 'react';
import FormikSelectInput from './FormikSelectInput';
import {FieldAttributes} from 'formik/dist/Field';
import {itemTypes} from '../../models/Item';
import TypeView from '../views/TypeView';

type FormikTypeSelectProps = FieldAttributes<any>;

const FormikTypeSelect = ({name, label}: FormikTypeSelectProps) => {
  const typeSelectMap = useMemo<Map<string, ReactElement>>(() => {
    const map = new Map<string, ReactElement>();
    itemTypes.forEach((t) => map.set(t, <TypeView type={t} />));
    return map;
  }, []);

  return <FormikSelectInput name={name} label={label} options={typeSelectMap} />;
};

export default FormikTypeSelect;
