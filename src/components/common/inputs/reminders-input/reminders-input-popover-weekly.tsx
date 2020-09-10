import React, {FC, useEffect, useState} from 'react';
import {Reminder} from '../../../../models/reminder';
import TimeInput from '../time-input/time-input';
import {remindersInputPopoverItemStyles} from './_styles';
import {Box} from '@material-ui/core';
import DaysSelect from '../days-select/days-select';

type Props = {
  reminder: Reminder;
  setReminder: (reminder: Reminder) => void;
};

const RemindersInputPopoverWeekly: FC<Props> = ({reminder, setReminder}: Props) => {
  const classes = remindersInputPopoverItemStyles();
  const [time, setTime] = useState<Date>(null);
  const [days, setDays] = useState<number[]>([]);

  useEffect(() => {
  }, [time, days]);

  const handleClick = (day: number): void => {
    setDays(prevState => {
      if (prevState.includes(day)) {
        prevState.splice(prevState.indexOf(day), 1);
      } else {
        prevState.push(day);
        prevState.sort();
      }
      return [...prevState];
    });
  };

  return (
    <Box className={classes.root}>
      <TimeInput label="Time" required time={time} setTime={setTime} />
      <DaysSelect label="Test" required selectedDays={days} handleClick={handleClick} />
    </Box>
  );
};

export default RemindersInputPopoverWeekly;
