import React from 'react';
import ReminderView from '../../views/ReminderView';
import {Reminder} from '../../../models/Reminder';
import {Box, Chip, SxProps} from '@mui/material';

type FormikRemindersInputChipsProps = {
  reminders: Reminder[];
  removeReminder: (index: number, event: React.SyntheticEvent) => void;
};

const FormikRemindersInputChips = ({reminders, removeReminder}: FormikRemindersInputChipsProps) => {
  return (
    <Box sx={containerStyles}>
      {reminders.map((reminder, index) => {
        const handleDelete = (e: React.SyntheticEvent): void => removeReminder(index, e);
        return (
          <Chip
            sx={chipStyles}
            size="medium"
            label={<ReminderView reminder={reminder} />}
            onDelete={handleDelete}
            key={index}
          />
        );
      })}
    </Box>
  );
};

const containerStyles: SxProps = {
  display: 'flex',
  flexWrap: 'wrap',
  width: '100%',
  paddingX: 0,
  paddingY: 1,
};

const chipStyles: SxProps = {
  margin: 0.5,
};

export default FormikRemindersInputChips;
