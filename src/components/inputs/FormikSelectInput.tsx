import React, {ReactElement} from 'react';
import {MenuItem} from '@mui/material';
import {Field} from 'formik';
import {TextField} from 'formik-mui';
import {FieldAttributes} from 'formik/dist/Field';

type FormikSelectInputProps = FieldAttributes<any> & {
  options: Map<string | number, string | ReactElement>;
};

const FormikSelectInput = ({options, ...props}: FormikSelectInputProps) => {
  console.log(options);
  return (
    <Field component={TextField} select fullWidth {...props}>
      {Array.from(options.keys()).map((key: string, index: number) => (
        <MenuItem value={key} key={index}>
          {options.get(key)}
        </MenuItem>
      ))}
    </Field>
  );
};

export default FormikSelectInput;
