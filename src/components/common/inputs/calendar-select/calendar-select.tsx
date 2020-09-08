import React, {FC, useContext} from 'react';
import {Box, Button} from '@material-ui/core';
import {MuiPickersContext} from '@material-ui/pickers';
import {calendarSelectStyles} from './_styles';
import csx from 'classnames';

type Props = {
  selectedDays?: number[];
  dayOfWeek?: number;
  datesInMonth?: number;
  firstAllowedDate?: number;
  showWeekend?: boolean;
  handleClick: (day: number) => void;
}

const getDaysAndWeeksCount = (dayOfWeek, daysInMonth): [number[], number] => {
  const restDays = (dayOfWeek + daysInMonth) % 7 ? 7 - (dayOfWeek + daysInMonth) % 7 : 0;
  const weekCount = (dayOfWeek + daysInMonth + restDays) / 7;
  const days = [];
  for (let i = 0; i < dayOfWeek; i++) {
    days.push(null);
  }
  for (let i = 0; i < daysInMonth; i++) {
    days.push(i + 1);
  }
  for (let i = 0; i < restDays; i++) {
    days.push(null);
  }
  return [days, weekCount];
};

const CalendarSelect: FC<Props> = (props: Props) => {
  const classes = calendarSelectStyles();
  const {dayOfWeek, datesInMonth, firstAllowedDate, selectedDays, showWeekend, handleClick} = props;
  const momentContext = useContext(MuiPickersContext);

  const dow = dayOfWeek || 0;
  const dim = datesInMonth || 31;
  const fad = firstAllowedDate || 0;
  const sd = selectedDays || [];
  const sw = showWeekend ?? true;

  const weekdayArray = momentContext.getWeekdays();
  const weekdays = (
    <Box className={classes.weekHeader}>
      {weekdayArray.map((name, index) => (
        <Box className={classes.day} key={index}>{name}</Box>
      ))}
    </Box>
  );

  const [daysValues, weekCount] = getDaysAndWeeksCount(dow, dim);
  const weekArray = Array.from({length: weekCount}, (_, i) => i);
  const dayArray = Array.from({length: 7}, (_, i) => i);
  const days = weekArray.map((week, weekIndex) => (
    <Box className={classes.week} key={weekIndex}>
      {dayArray.map((day, dayIndex) => {
        const dayValue = daysValues[week * 7 + day];
        const isDayAllowed = dayValue && dayValue >= fad;
        const isSelected = sd.includes(dayValue);
        const classnames = csx(classes.day, {[classes.selectedDay]: isSelected});
        return dayValue ? (
          <Button className={classnames} key={dayIndex} disabled={!isDayAllowed} onClick={() => handleClick(dayValue)}>
            {dayValue}
          </Button>
        ) : (
          <Box className={classes.day} key={dayIndex} />
        );
      })}
    </Box>
  ));

  return (
    <Box className={classes.root}>
      {sw && weekdays}
      {days}
    </Box>
  );
};

export default CalendarSelect;
