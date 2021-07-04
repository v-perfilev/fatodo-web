import React, {FC} from 'react';
import {Field, FieldAttributes} from 'formik';
import {TextField} from 'formik-material-ui';

type Props = FieldAttributes<any> & {
  name: string;
  label: string;
  required?: boolean;
};

export const TextInput: FC<Props> = ({name, label, required, ...props}: Props) => {
  return <Field component={TextField} type="text" name={name} label={label} required={required} fullWidth {...props} />;
};
