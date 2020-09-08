import React, {FC, useEffect, useState} from 'react';
import {Box, Fade, TextField} from '@material-ui/core';
import {DateUtils} from '../../../../shared/utils/date.utils';
import {dateInputStyles} from './_styles';
import DateInputDate from './date-input-date';
import DateInputYears from './date-input-years';
import DateInputMonths from './date-input-months';

type Props = {
  label: string;
  required?: boolean;
  date: Date;
  setDate: (date: Date) => void;
}

enum InputType {
  YEAR,
  MONTH,
  DATE,
};

const DateInput: FC<Props> = ({label, required, date: inputDate, setDate: setInputDate}: Props) => {
  const classes = dateInputStyles();
  const [date, setDate] = useState<Date>(null);
  const [inputType, setInputType] = useState<InputType>(null);

  useEffect(() => {
    setDate(inputDate || new Date());
  }, []);

  const formattedDate = inputDate ? DateUtils.formatDateWithYear(inputDate) : '';

  const openInput = (): void => {
    setInputType(InputType.YEAR);
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
    <>
      <TextField label={label} required={required} value={formattedDate} InputProps={{readOnly: true}}
                 onClick={openInput} />
      <Fade in={inputType !== null}>
        <Box className={classes.box}>
          {inputType === InputType.YEAR && <DateInputYears {...{date, handleChange}} />}
          {inputType === InputType.MONTH && <DateInputMonths {...{date, handleChange}} />}
          {inputType === InputType.DATE && <DateInputDate {...{date, handleChange}} />}
        </Box>
      </Fade>
    </>
  );
};

export default DateInput;
