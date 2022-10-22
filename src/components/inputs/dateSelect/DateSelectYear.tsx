import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import {Box, SxProps} from '@mui/material';

type DateSelectYearProps = {
  date: Date;
  handleChange: (date: Date) => void;
};

const DateSelectYear = ({date, handleChange}: DateSelectYearProps) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({length: 5}, (v, k) => k + currentYear);

  const handleClick = (index: number): void => {
    const newDate = cloneDeep(date);
    newDate.setFullYear(years[index]);
    handleChange(newDate);
  };

  return (
    <Box sx={containerStyles}>
      {years.map((year, index) => {
        const handleClickOnYear = (): void => handleClick(index);
        return (
          <Box sx={itemStyles} onClick={handleClickOnYear} key={index}>
            {year}
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
  overflowY: 'scroll',
};

const itemStyles: SxProps = {
  margin: 1,
  userSelect: 'none',
  cursor: 'pointer',
  fontSize: '1.3em',
  color: 'grey.700',
  '&:hover': {
    color: 'primary.main',
    fontWeight: 500,
  },
};

export default DateSelectYear;
