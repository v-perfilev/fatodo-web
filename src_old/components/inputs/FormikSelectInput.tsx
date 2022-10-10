import React from 'react';
import {Field} from 'formik';
import {TextField} from 'formik-material-ui';
import {MenuItem} from '@material-ui/core';

type FormikSelectInputProps = {
  name: string;
  label: string;
  options: Map<string, string>;
  required?: boolean;
};

const FormikSelectInput = ({name, label, options, required}: FormikSelectInputProps) => {
  return (
    <Field component={TextField} select name={name} label={label} required={required} fullWidth>
      {Array.from(options.keys()).map((key, index) => (
        <MenuItem value={key} key={index}>
          {options.get(key)}
        </MenuItem>
      ))}
    </Field>
  );
};

export default FormikSelectInput;
