import React from 'react';
import {Field, FieldAttributes} from 'formik';
import {Switch} from 'formik-mui';
import {FormControlLabel} from '@mui/material';
import FBox from '../boxes/FBox';

type FormikSwitchInputProps = FieldAttributes<any>;

const FormikSwitchInput = (props: FormikSwitchInputProps) => {
  return (
    <FBox>
      <FormControlLabel
        label={props.label}
        labelPlacement="start"
        control={<Field component={Switch} type="checkbox" {...props} />}
      />
    </FBox>
  );
};

export default FormikSwitchInput;
