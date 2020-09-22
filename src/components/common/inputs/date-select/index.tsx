import React, {FC, useEffect, useState} from 'react';
import {Box, Fade, TextField} from '@material-ui/core';
import {DateFormatters} from '../../../../shared/utils/date.utils';
import {dateInputStyles} from './_styles';
import {DateSelectYear} from './date-select-year';
import {DateSelectMonth} from './date-select-month';
import {DateSelectDate} from './date-select-date';

enum InputType {
  YEAR,
  MONTH,
  DATE,
}

type Props = {
  label: string;
  required?: boolean;
  date: Date;
  setDate: (date: Date) => void;
  firstInputType?: 'year' | 'month' | 'date';
};

export const DateSelect: FC<Props> = ({label, required, date: inputDate, setDate: setInputDate, firstInputType}: Props) => {
  const classes = dateInputStyles();
  const [date, setDate] = useState<Date>();
  const [inputType, setInputType] = useState<InputType>();

  useEffect(() => {
    setDate(inputDate || new Date());
  }, []);

  const formattedDate = inputDate
    ? !firstInputType || firstInputType === 'year'
      ? DateFormatters.formatDateWithYear(inputDate)
      : DateFormatters.formatDate(inputDate)
    : '';

  const openInput = (): void => {
    if (!firstInputType || firstInputType === 'year') {
      setInputType(InputType.YEAR);
    } else {
      const newDate = new Date();
      newDate.setFullYear(1970);
      setDate(newDate);
      setInputType(InputType.MONTH);
    }
  };

  const handleChange = (changedDate: Date): void => {
    if (inputType === InputType.YEAR) {
      setDate(changedDate);
      setInputType(InputType.MONTH);
    } else if (inputType === InputType.MONTH) {
      setDate(changedDate);
      setInputType(InputType.DATE);
    } else if (inputType === InputType.DATE) {
      setDate(changedDate);
      setInputDate(changedDate);
      setInputType(null);
    }
  };

  return (
    <Box>
      <TextField
        label={label}
        required={required}
        value={formattedDate}
        InputProps={{readOnly: true}}
        onClick={openInput}
        className={classes.textField}
      />
      <Fade in={inputType !== null}>
        <Box className={classes.box}>
          {inputType === InputType.YEAR && <DateSelectYear {...{date, handleChange}} />}
          {inputType === InputType.MONTH && <DateSelectMonth {...{date, handleChange}} />}
          {inputType === InputType.DATE && <DateSelectDate {...{date, handleChange}} />}
        </Box>
      </Fade>
    </Box>
  );
};
