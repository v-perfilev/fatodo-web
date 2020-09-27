import React, {FC} from 'react';
import {Field} from 'formik';
import {TextField} from 'formik-material-ui';

type Props = {
  name: string;
  label: string;
  rows?: number;
};

export const MultilineInput: FC<Props> = ({name, label, rows = 10}: Props) => {
  return <Field component={TextField} type="text" name={name} label={label} multiline fullWidth rows={rows} />;
};
