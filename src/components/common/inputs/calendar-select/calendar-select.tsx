import React, {FC, HTMLAttributes} from 'react';
import {Box, Button, FormLabel} from '@material-ui/core';
import {calendarSelectStyles} from './_styles';
import csx from 'classnames';
import {DateUtils} from '../../../../shared/utils/date.utils';

type Props = HTMLAttributes<any> & {
  label?: string;
  required?: boolean;
  selectedDates?: number[];
  dayOfWeek?: number;
  datesInMonth?: number;
  firstAllowedDate?: number;
  showWeekend?: boolean;
  handleClick: (day: number) => void;
};

const getDatesAndWeeksCount = (dayOfWeek, datesInMonth): [number[], number] => {
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

const CalendarSelect: FC<Props> = (props: Props) => {
  const classes = calendarSelectStyles();
  const {label, required} = props;
  const {dayOfWeek, datesInMonth, firstAllowedDate, selectedDates, showWeekend, handleClick, className} = props;

  const dow = dayOfWeek || 0;
  const dim = datesInMonth || 31;
  const fad = firstAllowedDate || 0;
  const sd = selectedDates || [];
  const sw = showWeekend ?? true;
  const dateClass = csx(classes.date, {[classes.dateSmall]: true});

  const weekdayArray = DateUtils.getWeekdayNames();
  const weekdays = (
    <Box className={classes.weekHeader}>
      {weekdayArray.map((name, index) => (
        <Box className={dateClass} key={index}>
          {name}
        </Box>
      ))}
    </Box>
  );

  const [datesValues, weekCount] = getDatesAndWeeksCount(dow, dim);
  const weekArray = Array.from({length: weekCount}, (_, i) => i);
  const dateArray = Array.from({length: 7}, (_, i) => i);
  const dates = weekArray.map((week, weekIndex) => (
    <Box className={classes.week} key={weekIndex}>
      {dateArray.map((date, dateIndex) => {
        const dayValue = datesValues[week * 7 + date];
        const isDayAllowed = dayValue && dayValue >= fad;
        const isSelected = sd.includes(dayValue);
        const classnames = csx(dateClass, {[classes.selectedDate]: isSelected});
        const handleClickOnDate = (): void => handleClick(dayValue);
        return dayValue ? (
          <Button className={classnames} key={dateIndex} disabled={!isDayAllowed} onClick={handleClickOnDate}>
            {dayValue}
          </Button>
        ) : (
          <Box className={dateClass} key={dateIndex} />
        );
      })}
    </Box>
  ));

  const classnames = csx(classes.root, className);
  return (
    <Box className={classnames}>
      {label && <FormLabel required={required}>{label}</FormLabel>}
      {sw && weekdays}
      {dates}
    </Box>
  );
};

export default CalendarSelect;
