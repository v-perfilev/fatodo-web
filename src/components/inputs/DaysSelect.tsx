import React from 'react';
import {Box, Button, FormLabel, SxProps} from '@mui/material';
import {DateUtils} from '../../shared/utils/DateUtils';

type DaysSelectProps = {
  label?: string;
  required?: boolean;
  selectedDays: number[];
  handleClick: (day: number) => void;
};

const DaysSelect = ({label, required, selectedDays, handleClick}: DaysSelectProps) => {
  const dayNames = DateUtils.getWeekdayNames();
  const dayNumbers = DateUtils.getWeekdayNumbers();

  const weekdays = dayNames.map((weekday, index) => {
    const dayNumber = dayNumbers[index];
    const handleClickOnDay = (): void => handleClick(dayNumber);
    const isSelected = selectedDays.includes(dayNumber);
    const styles: SxProps = isSelected ? {...dayStyles, ...selectedDayStyles} : dayStyles;
    return (
      <Button sx={styles} onClick={handleClickOnDay} key={index}>
        {weekday}
      </Button>
    );
  });

  return (
    <Box sx={containerStyles}>
      {label && <FormLabel required={required}>{label}</FormLabel>}
      <Box sx={weekStyles}>{weekdays}</Box>
    </Box>
  );
};

const containerStyles: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  '& .MuiFormLabel-root': {
    marginBottom: 0.5,
  },
};

const dayStyles: SxProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 34,
  minWidth: 34,
  maxWidth: 34,
  height: 34,
  marginX: 2,
  marginY: 1,
  borderRadius: 20,
};

const selectedDayStyles: SxProps = {
  backgroundColor: 'primary.main',
  color: 'primary.contrastText',
  '&:hover': {
    backgroundColor: 'primary.main',
    color: 'primary.contrastText',
  },
};

const weekStyles: SxProps = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
};

export default DaysSelect;
