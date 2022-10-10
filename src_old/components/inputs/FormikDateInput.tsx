import React, {MouseEvent} from 'react';
import {Field, useFormikContext} from 'formik';
import {DatePicker} from 'formik-material-ui-pickers';
import {DateConverters, DateFormats, DateUtils} from '../../shared/utils/date.utils';
import {IconButton} from '@material-ui/core';
import CloseIcon from '../icons/CloseIcon';
import {Moment} from 'moment';

type FormikDateInputProps = {
  name: string;
  label: string;
};

const FormikDateInput = ({name, label}: FormikDateInputProps) => {
  const {values, setFieldValue} = useFormikContext<any>();

  //need to set locale in moment here cause of bug in material-ui
  DateUtils.resetLocale();

  const clear = (e: MouseEvent): void => {
    e.stopPropagation();
    setFieldValue(name, null);
  };

  const onChange = (moment: Moment): void => {
    const date = DateConverters.getDateFromMoment(moment);
    setFieldValue(name, date);
  };

  const endAdornment = (
    <IconButton onClick={clear} size="small">
      <CloseIcon />
    </IconButton>
  );

  return (
    <Field
      component={DatePicker}
      type="text"
      name={name}
      label={label}
      format={DateFormats.dateWithYearFormat}
      onChange={onChange}
      variant="inline"
      fullWidth
      InputProps={{
        endAdornment: values[name] && endAdornment,
      }}
    />
  );
};

export default FormikDateInput;
