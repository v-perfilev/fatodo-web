import React, {FC} from 'react';
import {Field, useFormikContext} from 'formik';
import {TimePicker} from 'formik-material-ui-pickers';
import {DateFormats} from '../../../../shared/utils/date.utils';
import {IconButton} from '@material-ui/core';
import {CloseIcon} from '../../icons/close-icon';

type Props = {
  name: string;
  label: string;
};

export const TimeInput: FC<Props> = ({name, label}: Props) => {
  const {values, setFieldValue} = useFormikContext();

  const clear = (e): void => {
    e.stopPropagation();
    setFieldValue(name, null);
  };

  return (
    <Field
      component={TimePicker}
      type="text"
      name={name}
      label={label}
      format={DateFormats.timeFormat}
      ampm={false}
      variant="inline"
      fullWidth
      InputProps={{
        endAdornment: values[name] && (
          <IconButton onClick={clear} size="small">
            <CloseIcon />
          </IconButton>
        ),
      }}
    />
  );
};
