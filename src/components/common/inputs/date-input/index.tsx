import React, {FC} from 'react';
import {Field, useFormikContext} from 'formik';
import {DatePicker} from 'formik-material-ui-pickers';
import {DateConverters, DateFormats, DateUtils} from '../../../../shared/utils/date.utils';
import {IconButton} from '@material-ui/core';
import {CloseIcon} from '../../icons/close-icon';
import {Moment} from 'moment';

type Props = {
  name: string;
  label: string;
};

export const DateInput: FC<Props> = ({name, label}: Props) => {
  const {values, setFieldValue} = useFormikContext();

  //need to set locale in moment here cause of bug in material-ui
  DateUtils.resetLocale();

  const clear = (e): void => {
    e.stopPropagation();
    setFieldValue(name, null);
  };

  const onChange = (moment: Moment): void => {
    const date = DateConverters.getDateFromMoment(moment);
    setFieldValue(name, date);
  };

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
        endAdornment: values[name] && (
          <IconButton onClick={clear} size="small">
            <CloseIcon />
          </IconButton>
        ),
      }}
    />
  );
};
