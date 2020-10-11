import React, { FC, useEffect, useState } from 'react';
import { Box, Fade, TextField } from '@material-ui/core';
import { DateFormatters } from '../../../../shared/utils/date.utils';
import { dateInputStyles } from './_styles';
import { DateSelectYear } from './date-select-year';
import { DateSelectMonth } from './date-select-month';
import { DateSelectDate } from './date-select-date';

type InputType = 'year' | 'month' | 'date';

type Props = {
  label: string;
  required?: boolean;
  date: Date;
  setDate: (date: Date) => void;
  firstInputType?: InputType;
};

export const DateSelect: FC<Props> = ({ label, required, date, setDate, firstInputType }: Props) => {
  const classes = dateInputStyles();
  const [inputType, setInputType] = useState<InputType>();

  useEffect(() => {
    setDate(date);
  }, []);

  const formattedDate = date
    ? !firstInputType || firstInputType === 'year'
      ? DateFormatters.formatDateWithYear(date)
      : DateFormatters.formatDate(date)
    : '';

  const openInput = (): void => {
    const newDate = date ?? new Date();
    if (!firstInputType || firstInputType === 'year') {
      setInputType('year');
    } else {
      newDate.setFullYear(1970);
      setInputType('month');
    }
    setDate(newDate);
  };

  const handleChange = (changedDate: Date): void => {
    if (inputType === 'year') {
      setDate(changedDate);
      setInputType('month');
    } else if (inputType === 'month') {
      setDate(changedDate);
      setInputType('date');
    } else if (inputType === 'date') {
      setDate(changedDate);
      setInputType(null);
    }
  };

  return (
    <Box>
      <TextField
        label={label}
        required={required}
        value={formattedDate}
        InputProps={{ readOnly: true }}
        onClick={openInput}
        className={classes.textField}
      />
      <Fade in={!!inputType}>
        <Box className={classes.box}>
          {inputType === 'year' && <DateSelectYear {...{ date, handleChange }} />}
          {inputType === 'month' && <DateSelectMonth {...{ date, handleChange }} />}
          {inputType === 'date' && <DateSelectDate {...{ date, handleChange }} />}
        </Box>
      </Fade>
    </Box>
  );
};
