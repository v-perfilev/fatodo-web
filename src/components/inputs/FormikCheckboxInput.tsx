import React from 'react';
import {Field, FieldAttributes} from 'formik';
import {CheckboxWithLabel} from 'formik-mui';

type FormikCheckboxInputProps = FieldAttributes<any>;

const FormikCheckboxInput = (props: FormikCheckboxInputProps) => {
  return <Field component={CheckboxWithLabel} type="checkbox" {...props} />;
};

export default FormikCheckboxInput;
