import React from 'react';
import {Box} from '@material-ui/core';
import cloneDeep from 'lodash/cloneDeep';
import {DateUtils} from '../../../shared/utils/date.utils';
import CalendarSelect from '../CalendarSelect';
import {makeStyles, Theme} from '@material-ui/core/styles';

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
  const classes = dateSelectDateStyles();
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

const dateSelectDateStyles = makeStyles((theme: Theme) => ({
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

export default DateSelectDate;
