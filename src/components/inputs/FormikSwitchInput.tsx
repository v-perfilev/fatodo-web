import React from 'react';
import {Field, FieldAttributes} from 'formik';
import {Switch} from 'formik-mui';
import {FormControlLabel} from '@mui/material';
import FBox from '../boxes/FBox';

type FormikSwitchInputProps = FieldAttributes<any> & {
  fullWidth?: boolean;
};

const FormikSwitchInput = ({fullWidth, ...props}: FormikSwitchInputProps) => {
  const style = fullWidth ? {flexGrow: 1, justifyContent: 'space-between'} : undefined;

  return (
    <FBox>
      <FormControlLabel
        label={props.label}
        labelPlacement="start"
        style={style}
        control={<Field component={Switch} type="checkbox" {...props} />}
      />
    </FBox>
  );
};

export default FormikSwitchInput;
