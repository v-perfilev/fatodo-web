import React, {FC, useEffect, useState} from 'react';
import {Reminder} from '../../../../models/reminder';
import TimeInput from '../time-input/time-input';
import {remindersInputPopoverItemStyles} from './_styles';
import {Box} from '@material-ui/core';

type Props = {
  reminder: Reminder;
  setReminder: (reminder: Reminder) => void;
};

const RemindersInputPopoverDaily: FC<Props> = ({reminder, setReminder}: Props) => {
  const classes = remindersInputPopoverItemStyles();
  const [time, setTime] = useState<Date>(null);

  useEffect(() => {
  }, [time]);

  return (
    <Box className={classes.root}>
      <TimeInput label="Time" required time={time} setTime={setTime} />
    </Box>
  );
};

export default RemindersInputPopoverDaily;
