import React, {FC, useState} from 'react';
import {Field, FieldAttributes} from 'formik';
import {TextField} from 'formik-material-ui';
import {IconButton, InputAdornment} from '@material-ui/core';
import {VisibilityOnIcon} from '../../icons/VisibilityOnIcon';
import {VisibilityOffIcon} from '../../icons/VisibilityOffIcon';

type Props = FieldAttributes<any> & {
  name: string;
  label: string;
};

export const PasswordInput: FC<Props> = ({name, label, ...props}: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = (e): void => {
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
