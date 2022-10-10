import React, {useEffect, useState} from 'react';
import {Box, Fade, TextField} from '@material-ui/core';
import {DateFormatters} from '../../../shared/utils/date.utils';
import {makeStyles, Theme} from '@material-ui/core/styles';
import DateSelectYear from './DateSelectYear';
import DateSelectMonth from './DateSelectMonth';
import DateSelectDate from './DateSelectDate';

type InputType = 'year' | 'month' | 'date';

type DateSelectProps = {
  label: string;
  required?: boolean;
  date: Date;
  setDate: (date: Date) => void;
  firstInputType?: InputType;
};

const DateSelect = ({label, required, date, setDate, firstInputType}: DateSelectProps) => {
  const classes = dateSelectStyles();
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
        InputProps={{readOnly: true}}
        onClick={openInput}
        className={classes.textField}
      />
      <Fade in={!!inputType}>
        <Box className={classes.box}>
          {inputType === 'year' && <DateSelectYear {...{date, handleChange}} />}
          {inputType === 'month' && <DateSelectMonth {...{date, handleChange}} />}
          {inputType === 'date' && <DateSelectDate {...{date, handleChange}} />}
        </Box>
      </Fade>
    </Box>
  );
};

const dateSelectStyles = makeStyles((theme: Theme) => ({
  textField: {
    width: '100%',
  },
  box: {
    zIndex: 1000,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default DateSelect;
