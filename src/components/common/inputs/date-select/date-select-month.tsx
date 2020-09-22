import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {dateInputItemStyles} from './_styles';
import cloneDeep from 'lodash/cloneDeep';
import {DateFormatters} from '../../../../shared/utils/date.utils';

type Props = {
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

export const DateSelectMonth: FC<Props> = ({date, handleChange}: Props) => {
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
