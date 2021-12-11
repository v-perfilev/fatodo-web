import React, {FC} from 'react';
import {Field, useFormikContext} from 'formik';
import {TimePicker} from 'formik-material-ui-pickers';
import {DateConverters, DateFormats} from '../../../shared/utils/date.utils';
import {IconButton} from '@material-ui/core';
import {CloseIcon} from '../../icons/close-icon';
import {Moment} from 'moment';

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

  const onChange = (moment: Moment): void => {
    const time = DateConverters.getTimeFromMoment(moment);
    setFieldValue(name, time);
  };

  const inputProps = {
    endAdornment: values[name] && (
      <IconButton onClick={clear} size="small">
        <CloseIcon />
      </IconButton>
    ),
  };

  return (
    <Field
      component={TimePicker}
      type="text"
      label={label}
      name={name}
      format={DateFormats.timeFormat}
      onChange={onChange}
      ampm={false}
      variant="inline"
      fullWidth
      InputProps={inputProps}
    />
  );
};
