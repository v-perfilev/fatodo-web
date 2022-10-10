import React from 'react';
import {Field} from 'formik';
import {TextField} from 'formik-material-ui';
import {itemPriorityTypes} from '../../models/item.model';
import {MenuItem} from '@material-ui/core';
import {PriorityView} from '../views';

type FormikPriorityInputProps = {
  name: string;
  label: string;
};

const FormikPriorityInput = ({name, label}: FormikPriorityInputProps) => {
  return (
    <Field component={TextField} type="text" name={name} label={label} select required fullWidth>
      {Object.values(itemPriorityTypes).map((priority, index) => (
        <MenuItem value={priority} key={index}>
          <PriorityView priority={priority} />
        </MenuItem>
      ))}
    </Field>
  );
};

export default FormikPriorityInput;
