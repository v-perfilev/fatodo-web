import React from 'react';
import {Box} from '@material-ui/core';
import cloneDeep from 'lodash/cloneDeep';
import {DateFormatters} from '../../../shared/utils/date.utils';
import {makeStyles, Theme} from '@material-ui/core/styles';

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
  const classes = dateSelectMonthStyles();

  const firstMonth = getFirstMonth(date);
  const months = getMonths(firstMonth);

  const handleClick = (index: number): void => {
    const newDate = cloneDeep(date);
    newDate.setMonth(firstMonth + index);
    handleChange(newDate);
  };

  return (
    <Box className={classes.box}>
      {months.map((month, index) => {
        const handleClickOnMonth = (): void => handleClick(index);
        return (
          <Box className={classes.item} key={index} onClick={handleClickOnMonth}>
            {month}
          </Box>
        );
      })}
    </Box>
  );
};

const dateSelectMonthStyles = makeStyles((theme: Theme) => ({
  box: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(1),
    width: '100%',
    maxHeight: '100%',
    overflowY: 'scroll',
  },
  item: {
    margin: theme.spacing(1),
    userSelect: 'none',
    cursor: 'pointer',
    fontSize: '1.3em',
    '&:hover': {
      color: theme.palette.primary.main,
      fontWeight: 500,
    },
  },
}));

export default DateSelectMonth;
