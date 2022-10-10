import React from 'react';
import {Field} from 'formik';
import {TextField} from 'formik-material-ui';
import {colorSchemes} from '../../shared/theme/colors';
import {MenuItem} from '@material-ui/core';
import {ThemeView} from '../views';

type FormikThemeSelectProps = {
  name: string;
  label: string;
};

const FormikThemeSelect = ({name, label}: FormikThemeSelectProps) => {
  return (
    <Field component={TextField} type="text" name={name} label={label} select required fullWidth>
      {Object.values(colorSchemes).map((color, index) => (
        <MenuItem value={color} key={index}>
          <ThemeView color={color} />
        </MenuItem>
      ))}
    </Field>
  );
};

export default TextField;
