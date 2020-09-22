import React, {FC} from 'react';
import {Field} from 'formik';
import {TextField} from 'formik-material-ui';

type Props = {
  name: string;
  label: string;
};

export const TextInput: FC<Props> = ({name, label}: Props) => {
  return (
    <Field
      component={TextField}
      type="text"
      name={name}
      label={label}
      required
      fullWidth
    />
  );
};
