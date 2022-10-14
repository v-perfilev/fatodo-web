import React from 'react';
import {Field} from 'formik';
import {TextField} from 'formik-mui';
import {FieldAttributes} from 'formik/dist/Field';

type FormikTextInputProps = FieldAttributes<any>;

const FormikTextInput = (props: FormikTextInputProps) => {
  return <Field component={TextField} type="text" fullWidth {...props} />;
};

export default FormikTextInput;
