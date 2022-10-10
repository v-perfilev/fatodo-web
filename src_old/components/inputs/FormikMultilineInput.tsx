import React from 'react';
import {Field, FieldAttributes} from 'formik';
import {TextField} from 'formik-material-ui';

type FormikMultilineInputProps = FieldAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  rows?: number;
};

const FormikMultilineInput = ({name, label, rows = 10, ...props}: FormikMultilineInputProps) => {
  return (
    <Field component={TextField} type="text" name={name} label={label} multiline fullWidth rows={rows} {...props} />
  );
};

export default FormikMultilineInput;
