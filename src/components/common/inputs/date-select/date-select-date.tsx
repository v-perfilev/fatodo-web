import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {dateInputItemStyles} from './_styles';
import cloneDeep from 'lodash/cloneDeep';
import CalendarSelect from '../calendar-select';
import {DateUtils} from '../../../../shared/utils/date.utils';

type Props = {
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

export const DateSelectDate: FC<Props> = ({date, handleChange}: Props) => {
  const classes = dateInputItemStyles();
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
