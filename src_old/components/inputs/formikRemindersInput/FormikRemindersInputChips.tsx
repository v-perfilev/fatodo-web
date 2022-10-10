import {Reminder} from '../../../models/reminder.model';
import React from 'react';
import {Box, Chip} from '@material-ui/core';
import ReminderView from '../../views/ReminderView';
import {makeStyles} from '@material-ui/core/styles';

type FormikRemindersInputChipsProps = {
  reminders: Reminder[];
  removeReminder: (index: number, event: React.SyntheticEvent) => void;
};

const FormikRemindersInputChips = ({reminders, removeReminder}: FormikRemindersInputChipsProps) => {
  const classes = formikRemindersInputChipsStyles();

  return (
    <Box className={classes.root}>
      {reminders.map((reminder, index) => {
        const handleDelete = (e: React.SyntheticEvent): void => removeReminder(index, e);
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

const formikRemindersInputChipsStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
  },
  chip: {
    margin: 3,
  },
}));

export default FormikRemindersInputChips;
