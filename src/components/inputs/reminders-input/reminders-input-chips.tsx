import {Reminder} from '../../../models/reminder.model';
import React, {FC} from 'react';
import {Box, Chip} from '@material-ui/core';
import {remindersInputChipsStyles} from './_styles';
import ReminderView from '../../views/reminder-view/reminder-view';

type Props = {
  reminders: Reminder[];
  removeReminder: (index: number, event) => void;
};

export const RemindersInputChips: FC<Props> = ({reminders, removeReminder}: Props) => {
  const classes = remindersInputChipsStyles();

  return (
    <Box className={classes.root}>
      {reminders.map((reminder, index) => {
        const handleDelete = (e): void => removeReminder(index, e);
        return (
          <Chip
            className={classes.chip}
            key={index}
            size="medium"
            label={<ReminderView reminder={reminder} />}
            onDelete={handleDelete}
          />
        );
      })}
    </Box>
  );
};
