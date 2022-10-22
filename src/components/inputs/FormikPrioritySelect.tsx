import React, {ReactElement, useMemo} from 'react';
import FormikSelectInput from './FormikSelectInput';
import {FieldAttributes} from 'formik/dist/Field';
import {itemPriorityTypes} from '../../models/Item';
import PriorityView from '../views/PriorityView';

type FormikPrioritySelectProps = FieldAttributes<any>;

const FormikPrioritySelect = ({name, label}: FormikPrioritySelectProps) => {
  const prioritySelectMap = useMemo<Map<string, ReactElement>>(() => {
    const map = new Map<string, ReactElement>();
    itemPriorityTypes.forEach((p) => map.set(p, <PriorityView priority={p} />));
    return map;
  }, []);

  return <FormikSelectInput name={name} label={label} options={prioritySelectMap} />;
};

export default FormikPrioritySelect;
