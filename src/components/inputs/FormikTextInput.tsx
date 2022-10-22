import React from 'react';
import {Field} from 'formik';
import {TextField} from 'formik-mui';
import {FieldAttributes} from 'formik/dist/Field';

type FormikTextInputProps = FieldAttributes<any> & {
  rows?: number;
};

const FormikTextInput = ({rows, ...props}: FormikTextInputProps) => {
  return <Field component={TextField} type="text" fullWidth multiline={!!rows} rows={rows} {...props} />;
};

export default FormikTextInput;
