import React from 'react';
import {Field, FieldAttributes} from 'formik';
import {CheckboxWithLabel} from 'formik-mui';

type FormikTextInputProps = FieldAttributes<any>;

const FormikTextInput = (props: FormikTextInputProps) => {
  return <Field component={CheckboxWithLabel} type="checkbox" {...props} />;
};

export default FormikTextInput;
