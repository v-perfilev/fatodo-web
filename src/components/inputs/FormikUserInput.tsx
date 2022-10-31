import React, {useEffect} from 'react';
import {Field, useFormikContext} from 'formik';
import {FieldAttributes} from 'formik/dist/Field';
import {TextField} from '@mui/material';
import UserService from '../../services/UserService';

type FormikUserInputProps = FieldAttributes<any>;

const FormikUserInput = ({userName, ...props}: FormikUserInputProps) => {
  const {values, setFieldValue, errors} = useFormikContext<any>();

  const value = values[name];
  const isError = name in errors;

  useEffect(() => {
    if (value.length > 1 && !isError) {
      UserService.getByUsernameOrEmail(value).then((response) => setFieldValue(userName, response.data));
    } else {
      setFieldValue(userName, null);
    }
  }, [isError]);

  return <Field component={TextField} type="text" fullWidth {...props} />;
};

export default FormikUserInput;
