import React, {useMemo} from 'react';
import {timezones} from '../../shared/timezone';
import {DateFormatters} from '../../shared/utils/DateFormatters';
import {FieldAttributes} from 'formik/dist/Field';
import FormikSelectInput from './FormikSelectInput';

type FormikTimezoneInputProps = FieldAttributes<any>;

const FormikTimezoneInput = ({name, label}: FormikTimezoneInputProps) => {
  const timezoneSelectMap = useMemo<Map<string, string>>(() => {
    const map = new Map<string, string>();
    timezones.forEach((t) => map.set(t, DateFormatters.formatTimezone(t)));
    return map;
  }, []);

  return <FormikSelectInput name={name} label={label} options={timezoneSelectMap} />;
};

export default FormikTimezoneInput;
