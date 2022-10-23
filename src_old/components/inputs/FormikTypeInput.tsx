import React from 'react';
import {Field} from 'formik';
import {TextField} from 'formik-material-ui';
import {itemTypes} from '../../models/item.model';
import {MenuItem} from '@material-ui/core';
import {TypeView} from '../views';

type FormikTypeInputProps = {
  name: string;
  label: string;
};

const FormikTypeInput = ({name, label}: FormikTypeInputProps) => {
  return (
    <Field component={TextField} type="text" name={name} label={label} select required fullWidth>
      {Object.values(itemTypes).map((type, index) => (
        <MenuItem value={type} key={index}>
          <TypeView type={type} />
        </MenuItem>
      ))}
    </Field>
  );
};

export default FormikTypeInput;