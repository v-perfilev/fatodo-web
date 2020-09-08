import React, {FC, useState} from 'react';
import {Reminder} from '../../../../models/reminder';
import TimeInput from '../time-input/time-input';
import DateInput from '../date-input/date-input';
import {remindersInputPopoverOnceStyles} from './_styles';
import {Box} from '@material-ui/core';

type Props = {
  reminder: Reminder;
  setReminder: (reminder: Reminder) => void;
};

const RemindersInputPopoverOnce: FC<Props> = ({reminder, setReminder}: Props) => {
  const classes = remindersInputPopoverOnceStyles();
  const [time, setTime] = useState<Date>(null);
  const [date, setDate] = useState<Date>(null);

  return (
    <Box className={classes.root}>
      <TimeInput label="Time" time={time} required setTime={setTime} />
      <DateInput label="Date" required date={date} setDate={setDate} />
    </Box>
  );
};

export default RemindersInputPopoverOnce;
