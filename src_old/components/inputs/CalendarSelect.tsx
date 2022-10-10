import React, {HTMLAttributes} from 'react';
import {Box, Button, FormLabel} from '@material-ui/core';
import csx from 'classnames';
import {DateUtils} from '../../shared/utils/date.utils';
import {makeStyles, Theme} from '@material-ui/core/styles';

type CalendarSelectProps = HTMLAttributes<HTMLElement> & {
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
  const classes = calendarSelectStyles();
  const {label, required} = props;
  const {dayOfWeek, datesInMonth, firstAllowedDate, selectedDates, showWeekend, handleClick, className} = props;

  const dow = dayOfWeek || 0;
  const dim = datesInMonth || 31;
  const fad = firstAllowedDate || 0;
  const sd = selectedDates || [];
  const sw = showWeekend ?? true;
  const dateClass = csx(classes.date, {[classes.dateSmall]: true});

  const [datesValues, weekCount] = getDatesAndWeeksCount(dow, dim);
  const weekArray = Array.from({length: weekCount}, (_, i) => i);
  const dateArray = Array.from({length: 7}, (_, i) => i);
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

const calendarSelectStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    '& .MuiFormLabel-root': {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(0.5),
    },
  },
  weekHeader: {
    display: 'flex',
    flexDirection: 'row',
    fontWeight: 500,
    color: theme.palette.grey['500'],
  },
  week: {
    display: 'flex',
    flexDirection: 'row',
  },
  date: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    minWidth: 36,
    maxWidth: 36,
    height: 36,
    margin: 2,
    padding: 0,
    borderRadius: 40,
  },
  dateSmall: {
    width: 34,
    minWidth: 34,
    maxWidth: 34,
    height: 34,
    margin: 1,
  },
  selectedDate: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.primary.contrastText,
    },
  },
}));

export default CalendarSelect;
