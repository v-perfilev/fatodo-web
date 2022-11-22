import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import {DateFormatters} from '../../../shared/utils/DateFormatters';
import {Box, SxProps} from '@mui/material';

type DateSelectMonthProps = {
  date: Date;
  handleChange: (date: Date) => void;
};

const getMonthName = (month: number): string => {
  const date = new Date();
  date.setMonth(month);
  return DateFormatters.formatMonth(date);
};

const getFirstMonth = (date: Date): number => {
  const currentDate = new Date();
  return date.getFullYear() === currentDate.getFullYear() ? currentDate.getMonth() : 0;
};

const getMonths = (firstMonth: number): string[] =>
  Array.from({length: 12 - firstMonth}, (_, i) => getMonthName(firstMonth + i));

const DateSelectMonth = ({date, handleChange}: DateSelectMonthProps) => {
  const firstMonth = getFirstMonth(date);
  const months = getMonths(firstMonth);

  const handleClick = (index: number): void => {
    const newDate = cloneDeep(date);
    newDate.setMonth(firstMonth + index);
    handleChange(newDate);
  };

  return (
    <Box sx={containerStyles}>
      {months.map((month, index) => {
        const handleClickOnMonth = (): void => handleClick(index);
        return (
          <Box sx={itemStyles} onClick={handleClickOnMonth} key={index}>
            {month}
          </Box>
        );
      })}
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
  overflowY: 'auto',
};

const itemStyles: SxProps = {
  margin: 1,
  cursor: 'pointer',
  fontSize: '1.3em',
  color: 'grey.700',
  '&:hover': {
    color: 'primary.main',
    fontWeight: 500,
  },
};

export default DateSelectMonth;
