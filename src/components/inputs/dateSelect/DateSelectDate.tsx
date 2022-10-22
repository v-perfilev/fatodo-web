import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import CalendarSelect from '../CalendarSelect';
import {DateUtils} from '../../../shared/utils/DateUtils';
import {Box, SxProps} from '@mui/material';

type DateSelectDateProps = {
  date: Date;
  handleChange: (date: Date) => void;
};

const getParamsOfMonth = (date: Date): [number, number] => {
  const tmpDate = cloneDeep(date);
  tmpDate.setDate(1);
  const dayOfWeek = DateUtils.getDayOfWeek(tmpDate);
  const datesInMonth = DateUtils.getDatesInMonth(tmpDate);
  return [dayOfWeek, datesInMonth];
};

const getFirstDate = (date: Date): number => {
  const currentDate = new Date();
  return date.getFullYear() === currentDate.getFullYear() && date.getMonth() === currentDate.getMonth()
    ? currentDate.getDate()
    : 0;
};

const DateSelectDate = ({date, handleChange}: DateSelectDateProps) => {
  const [dayOfWeek, datesInMonth] = getParamsOfMonth(date);

  const handleClick = (index: number): void => {
    const newDate = cloneDeep(date);
    newDate.setDate(index);
    handleChange(newDate);
  };

  const firstAllowedDate = getFirstDate(date);

  return (
    <Box sx={containerStyles}>
      <CalendarSelect {...{dayOfWeek, datesInMonth, firstAllowedDate}} handleClick={handleClick} />
    </Box>
  );
};

const containerStyles: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: 1,
  width: '100%',
  maxHeight: '100%',
  overflowY: 'scroll',
};

export default DateSelectDate;
