import React, {FC} from 'react';
import {Field} from 'formik';
import {TextField} from 'formik-material-ui';
import {MenuItem} from '@material-ui/core';

type Props = {
  name: string;
  label: string;
  options: Map<string, string>;
  required?: boolean;
};

export const SelectInput: FC<Props> = ({name, label, options, required}: Props) => {
  return (
    <Field component={TextField} select name={name} label={label} required={required} fullWidth>
      {Array.from(options.keys()).map((key, index) => (
        <MenuItem value={key} key={index}>
          {options.get(key)}
        </MenuItem>
      ))}
    </Field>
  );
};
