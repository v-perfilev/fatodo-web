import React, {FC, useEffect, useState} from 'react';
import {Reminder} from '../../../../models/reminder';
import TimeInput from '../time-input/time-input';
import DateInput from '../date-input/date-input';
import {remindersInputPopoverItemStyles} from './_styles';
import {Box} from '@material-ui/core';

type Props = {
  reminder: Reminder;
  setReminder: (reminder: Reminder) => void;
};

const RemindersInputPopoverYearly: FC<Props> = ({reminder, setReminder}: Props) => {
  const classes = remindersInputPopoverItemStyles();
  const [time, setTime] = useState<Date>(null);
  const [date, setDate] = useState<Date>(null);

  useEffect(() => {
  }, [time, date]);

  return (
    <Box className={classes.root}>
      <TimeInput label="Time" required time={time} setTime={setTime} />
      <DateInput label="Date" required date={date} setDate={setDate} firstInputType="month" />
    </Box>
  );
};

export default RemindersInputPopoverYearly;
