import React, {FC, useEffect, useState} from 'react';
import {Reminder} from '../../../../models/reminder';
import TimeInput from '../time-input/time-input';
import {remindersInputPopoverItemStyles} from './_styles';
import {Box} from '@material-ui/core';
import CalendarSelect from '../calendar-select/calendar-select';

type Props = {
  reminder: Reminder;
  setReminder: (reminder: Reminder) => void;
};

const RemindersInputPopoverMonthly: FC<Props> = ({reminder, setReminder}: Props) => {
  const classes = remindersInputPopoverItemStyles();
  const [time, setTime] = useState<Date>(null);
  const [dates, setDates] = useState<number[]>([]);

  useEffect(() => {
  }, [time, dates]);

  const handleClick = (date: number): void => {
    setDates(prevState => {
      if (prevState.includes(date)) {
        prevState.splice(prevState.indexOf(date), 1);
      } else {
        prevState.push(date);
        prevState.sort();
      }
      return [...prevState];
    });
  };

  return (
    <Box className={classes.root}>
      <TimeInput label="Time" required time={time} setTime={setTime} />
      <CalendarSelect label="Test" required selectedDates={dates} handleClick={handleClick} showWeekend={false} />
    </Box>
  );
};

export default RemindersInputPopoverMonthly;
