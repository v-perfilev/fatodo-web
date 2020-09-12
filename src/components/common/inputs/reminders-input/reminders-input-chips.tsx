import {Reminder} from '../../../../models/reminder.model';
import React, {FC} from 'react';
import {Box, Chip} from '@material-ui/core';
import ReminderView from '../../layout-item/reminder-view';
import {remindersInputChipsStyles} from './_styles';

type Props = {
  reminders: Reminder[];
  removeReminder: (index: number, event) => void;
};

const RemindersInputChips: FC<Props> = ({reminders, removeReminder}: Props) => {
  const classes = remindersInputChipsStyles();

  return (
    reminders.length > 0 && (
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
    )
  );
};

export default RemindersInputChips;
