import React, {useState} from 'react';
import {Field, FieldAttributes} from 'formik';
import VisibilityOnIcon from '../icons/VisibilityOnIcon';
import VisibilityOffIcon from '../icons/VisibilityOffIcon';
import {TextField, TextFieldProps} from 'formik-mui';
import {IconButton, InputAdornment} from '@mui/material';

type FormikPasswordInputProps = FieldAttributes<Partial<TextFieldProps>>;

const FormikPasswordInput = (props: FormikPasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = (e: React.MouseEvent): void => {
    e.preventDefault();
    setShowPassword((prevState) => !prevState);
  };

  return (
    <Field
      component={TextField}
      type={showPassword ? 'text' : 'password'}
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={toggleShowPassword} size={'small'}>
              {showPassword ? <VisibilityOnIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
};

export default FormikPasswordInput;
