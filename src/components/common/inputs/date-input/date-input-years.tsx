import React, {FC} from 'react';
import {Box} from '@material-ui/core';
import {dateInputItemStyles} from './_styles';
import cloneDeep from 'lodash/cloneDeep';

type Props = {
  date: Date;
  handleChange: (date: Date) => void;
};

const DateInputYears: FC<Props> = ({date, handleChange}: Props) => {
  const classes = dateInputItemStyles();

  const currentYear = new Date().getFullYear();
  const years = Array.from({length: 5}, (v, k) => k + currentYear);

  const handleClick = (index: number): void => {
    const newDate = cloneDeep(date);
    newDate.setFullYear(years[index]);
    handleChange(newDate);
  };

  return (
    <Box className={classes.box}>
      {years.map((year, index) => {
        const handleClickOnYear = (): void => handleClick(index);
        return (
          <Box className={classes.item} key={index} onClick={handleClickOnYear}>
            {year}
          </Box>
        );
      })}
    </Box>
  );
};

export default DateInputYears;
