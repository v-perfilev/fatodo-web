import React, {FC} from 'react';
import {Field} from 'formik';
import {TextField} from 'formik-material-ui';

type Props = {
  name: string;
  label: string;
  required?: boolean;
};

export const TextInput: FC<Props> = ({name, label, required}: Props) => {
  return <Field component={TextField} type="text" name={name} label={label} required={required} fullWidth />;
};
