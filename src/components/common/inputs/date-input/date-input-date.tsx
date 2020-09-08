import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {dateInputYearsStyles} from './_styles';
import cloneDeep from 'lodash/cloneDeep';
import moment from 'moment';
import CalendarSelect from '../calendar-select/calendar-select';

type Props = {
  date: Date;
  handleChange: (date: Date) => void;
}

const getParamsOfMonth = (date: Date): [number, number] => {
  const tmpDate = cloneDeep(date);
  tmpDate.setDate(1);
  const dayOfWeek = moment(tmpDate).weekday();
  const datesInMonth = moment(tmpDate).daysInMonth();
  return [dayOfWeek, datesInMonth];
};

const getFirstDate = (date: Date): number => {
  const currentDate = new Date();
  return date.getFullYear() === currentDate.getFullYear()
  && date.getMonth() === currentDate.getMonth()
    ? currentDate.getDate()
    : 0;
};

const DateInputDate: FC<Props> = ({date, handleChange}: Props) => {
  const classes = dateInputYearsStyles();
  const [dayOfWeek, datesInMonth] = getParamsOfMonth(date);

  const handleClick = (index: number): void => {
    const newDate = cloneDeep(date);
    newDate.setDate(index);
    handleChange(newDate);
  };

  const firstAllowedDate = getFirstDate(date);

  return (
    <Box className={classes.box}>
      <CalendarSelect {...{dayOfWeek, datesInMonth, firstAllowedDate}} handleClick={handleClick} />
    </Box>
  );
};

export default DateInputDate;
