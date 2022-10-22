import React, {ReactElement, useMemo} from 'react';
import FormikSelectInput from './FormikSelectInput';
import {FieldAttributes} from 'formik/dist/Field';
import {itemStatusTypes} from '../../models/Item';
import StatusView from '../views/StatusView';

type FormikStatusSelectProps = FieldAttributes<any>;

const FormikStatusSelect = ({name, label}: FormikStatusSelectProps) => {
  const statusSelectMap = useMemo<Map<string, ReactElement>>(() => {
    const map = new Map<string, ReactElement>();
    itemStatusTypes.forEach((s) => map.set(s, <StatusView statusType={s} />));
    return map;
  }, []);

  return <FormikSelectInput name={name} label={label} options={statusSelectMap} />;
};

export default FormikStatusSelect;
