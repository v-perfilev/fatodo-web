import React, {useState} from 'react';
import {Field, FieldAttributes} from 'formik';
import {TextField} from 'formik-material-ui';
import {IconButton, InputAdornment} from '@material-ui/core';
import VisibilityOnIcon from '../icons/VisibilityOnIcon';
import VisibilityOffIcon from '../icons/VisibilityOffIcon';

type FormikPasswordInputProps = FieldAttributes<any> & {
  name: string;
  label: string;
};

const FormikPasswordInput = ({name, label, ...props}: FormikPasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = (e: React.MouseEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setShowPassword((prevState) => !prevState);
  };

  return (
    <Field
      component={TextField}
      type={showPassword ? 'text' : 'password'}
      name={name}
      label={label}
      fullWidth={true}
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
