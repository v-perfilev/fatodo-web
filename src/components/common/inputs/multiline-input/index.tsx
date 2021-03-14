import React, {FC} from 'react';
import {Field, FieldAttributes} from 'formik';
import {TextField} from 'formik-material-ui';

type Props = FieldAttributes<any> & {
  name: string;
  label: string;
  rows?: number;
};

export const MultilineInput: FC<Props> = ({name, label, rows = 10, ...props}: Props) => {
  return <Field component={TextField} type="text" name={name} label={label} multiline fullWidth
                rows={rows} {...props} />;
};
