import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {dateInputItemStyles} from './_styles';
import cloneDeep from 'lodash/cloneDeep';
import moment from 'moment';

type Props = {
  date: Date;
  handleChange: (date: Date) => void;
}

const getMonthName = (month: number): string => {
  const date = new Date();
  date.setMonth(month);
  return moment(date).format('MMMM');
};

const getFirstMonth = (date: Date): number => {
  const currentDate = new Date();
  return date.getFullYear() === currentDate.getFullYear()
    ? currentDate.getMonth()
    : 0;
};

const getMonths = (firstMonth: number): string[] =>
  Array.from({length: 12 - firstMonth}, (_, i) => getMonthName(firstMonth + i));

const DateInputMonths: FC<Props> = ({date, handleChange}: Props) => {
  const classes = dateInputItemStyles();

  const firstMonth = getFirstMonth(date);
  const months = getMonths(firstMonth);

  const handleClick = (index: number): void => {
    const newDate = cloneDeep(date);
    newDate.setMonth(firstMonth + index);
    handleChange(newDate);
  };

  return (
    <Box className={classes.box}>
      {months.map((month, index) => (
        <Box className={classes.item} key={index} onClick={() => handleClick(index)}>
          {month}
        </Box>
      ))}
    </Box>
  );
};

export default DateInputMonths;
