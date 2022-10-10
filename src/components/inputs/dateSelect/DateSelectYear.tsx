import React from 'react';
import {Box} from '@material-ui/core';
import cloneDeep from 'lodash/cloneDeep';
import {makeStyles, Theme} from '@material-ui/core/styles';

type DateSelectYearProps = {
  date: Date;
  handleChange: (date: Date) => void;
};

const DateSelectYear = ({date, handleChange}: DateSelectYearProps) => {
  const classes = dateSelectYearStyles();

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

const dateSelectYearStyles = makeStyles((theme: Theme) => ({
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

export default DateSelectYear;
