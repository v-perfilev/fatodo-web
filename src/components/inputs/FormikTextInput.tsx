import React from 'react';
import {Field, FieldAttributes} from 'formik';
import {TextField} from 'formik-material-ui';

type FormikTextInputProps = FieldAttributes<any> & {
  name: string;
  label: string;
  required?: boolean;
};

const FormikTextInput = ({name, label, required, ...props}: FormikTextInputProps) => {
  return <Field component={TextField} type="text" name={name} label={label} required={required} fullWidth {...props} />;
};

export default FormikTextInput;
