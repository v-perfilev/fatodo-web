import React from 'react';
import {DateUtils} from '../../shared/utils/DateUtils';
import {Box, Button, FormLabel, SxProps} from '@mui/material';

type CalendarSelectProps = {
  label?: string;
  required?: boolean;
  selectedDates?: number[];
  dayOfWeek?: number;
  datesInMonth?: number;
  firstAllowedDate?: number;
  showWeekend?: boolean;
  handleClick: (day: number) => void;
};

const getDatesAndWeeksCount = (dayOfWeek: number, datesInMonth: number): [number[], number] => {
  const restDays = (dayOfWeek + datesInMonth) % 7 ? 7 - ((dayOfWeek + datesInMonth) % 7) : 0;
  const weekCount = (dayOfWeek + datesInMonth + restDays) / 7;
  const dates = [];
  for (let i = 0; i < dayOfWeek; i++) {
    dates.push(null);
  }
  for (let i = 0; i < datesInMonth; i++) {
    dates.push(i + 1);
  }
  for (let i = 0; i < restDays; i++) {
    dates.push(null);
  }
  return [dates, weekCount];
};

const CalendarSelect = (props: CalendarSelectProps) => {
  const {label, required} = props;
  const {dayOfWeek, datesInMonth, firstAllowedDate, selectedDates, showWeekend, handleClick} = props;

  const dow = dayOfWeek || 0;
  const dim = datesInMonth || 31;
  const fad = firstAllowedDate || 0;
  const sd = selectedDates || [];
  const sw = showWeekend ?? true;

  const [datesValues, weekCount] = getDatesAndWeeksCount(dow, dim);
  const weekArray = Array.from({length: weekCount}, (_, i) => i);
  const dateArray = Array.from({length: 7}, (_, i) => i);
  const weekdayArray = DateUtils.getWeekdayNames();

  const weekdays = (
    <Box sx={weekHeaderStyles}>
      {weekdayArray.map((name, index) => (
        <Box sx={dateStyles} key={index}>
          {name}
        </Box>
      ))}
    </Box>
  );

  const dates = weekArray.map((week, weekIndex) => (
    <Box sx={weekStyles} key={weekIndex}>
      {dateArray.map((date, dateIndex) => {
        const dayValue = datesValues[week * 7 + date];
        const isDayAllowed = dayValue && dayValue >= fad;
        const handleClickOnDate = (): void => handleClick(dayValue);
        const isSelected = sd.includes(dayValue);
        const styles: SxProps = isSelected ? {...dateStyles, ...selectedDateStyles} : dateStyles;
        return dayValue ? (
          <Button sx={styles} key={dateIndex} disabled={!isDayAllowed} onClick={handleClickOnDate}>
            {dayValue}
          </Button>
        ) : (
          <Box sx={dateStyles} key={dateIndex} />
        );
      })}
    </Box>
  ));

  return (
    <Box sx={containerStyles}>
      {label && <FormLabel required={required}>{label}</FormLabel>}
      <Box sx={monthStyles}>
        {sw && weekdays}
        {dates}
      </Box>
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

const monthStyles: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
};

const weekHeaderStyles: SxProps = {
  display: 'flex',
  flexDirection: 'row',
  fontWeight: 500,
  color: 'grey.500',
};

const weekStyles: SxProps = {
  display: 'flex',
  flexDirection: 'row',
};

const dateStyles: SxProps = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 32,
  minWidth: 32,
  maxWidth: 32,
  height: 32,
  margin: 0.5,
  padding: 0,
  borderRadius: 40,
};

const selectedDateStyles: SxProps = {
  backgroundColor: 'primary.main',
  color: 'primary.contrastText',
  '&:hover': {
    backgroundColor: 'primary.main',
    color: 'primary.contrastText',
  },
};

export default CalendarSelect;
