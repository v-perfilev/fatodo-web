import React, {useEffect, useState} from 'react';
import {useFormikContext} from 'formik';
import RemindersInputPopover from './FormikRemindersInputPopover';
import FormikRemindersInputButtons from './FormikRemindersInputButtons';
import FormikRemindersInputChips from './FormikRemindersInputChips';
import {Reminder} from '../../../models/Reminder';
import {Box, TextField} from '@mui/material';

type FormikRemindersInputProps = {
  name: string;
  label: string;
};

const FormikRemindersInput = ({name, label}: FormikRemindersInputProps) => {
  const {values, setFieldValue} = useFormikContext<any>();
  const [anchorEl, setAnchorEl] = useState<HTMLElement>(null);
  const [reminders, setReminders] = useState<Reminder[]>([]);

  useEffect(() => {
    setReminders(values[name]);
  }, []);

  useEffect(() => {
    setFieldValue(name, reminders);
  }, [reminders]);

  const handleClick = (e: React.MouseEvent<HTMLElement>): void => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = (reminder: Reminder): void => {
    if (reminder) {
      setReminders((prevState) => [...prevState, reminder]);
    }
    setAnchorEl(null);
  };

  const removeReminder = (index: number, e: React.SyntheticEvent): void => {
    e.stopPropagation();
    setReminders((prevState) => {
      prevState.splice(index, 1);
      return [...prevState];
    });
  };

  const clearReminders = (e: React.MouseEvent): void => {
    e.stopPropagation();
    setReminders([]);
  };

  const inputLabelProps = reminders.length > 0 ? {} : {shrink: false};

  const inputProps =
    reminders.length > 0
      ? {
          readOnly: true,
          startAdornment: <FormikRemindersInputChips {...{reminders, removeReminder}} />,
          endAdornment: <FormikRemindersInputButtons {...{clearReminders}} />,
        }
      : {readOnly: true};

  return (
    <Box>
      <TextField
        label={label}
        InputLabelProps={inputLabelProps}
        InputProps={inputProps}
        onClick={handleClick}
        fullWidth
      />
      <RemindersInputPopover {...{anchorEl, handleClose}} />
    </Box>
  );
};

export default FormikRemindersInput;
