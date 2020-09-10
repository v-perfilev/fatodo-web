import {Reminder} from '../../../../models/reminder';
import React, {FC, useEffect, useState} from 'react';
import {Box} from '@material-ui/core';
import {Field} from 'formik';
import {TextField} from 'formik-material-ui';
import {remindersInputStyles} from './_styles';
import RemindersInputChips from './reminders-input-chips';
import RemindersInputButtons from './reminders-input-buttons';
import RemindersInputPopover from './reminders-input-popover';

type Props = {
  label: string;
  name: string;
  values: any;
  setFieldValue: (field: string, value: Reminder[]) => void;
};

const RemindersInput: FC<Props> = ({label, name, values, setFieldValue}: Props) => {
  const classes = remindersInputStyles();
  const [anchorEl, setAnchorEl] = useState<HTMLElement>(null);
  const [reminders, setReminders] = useState<Reminder[]>([]);

  useEffect(() => {
    setReminders(values[name]);
  }, []);

  useEffect(() => {
    setFieldValue(name, reminders);
  }, [reminders]);

  const handleClick = (event: React.MouseEvent<HTMLElement>): void => setAnchorEl(event.currentTarget);

  const handleClose = (reminder: Reminder): void => {
    if (reminder) {
      setReminders((prevState) => [...prevState, reminder]);
    }
    setAnchorEl(null);
  };

  const removeReminder = (index, e): void => {
    e.stopPropagation();
    setReminders((prevState) => {
      const newState = prevState;
      newState.splice(index, 1);
      return [...newState];
    });
  };

  const clearReminders = (e): void => {
    e.stopPropagation();
    setReminders([]);
  };

  return (
    <Box className={classes.root}>
      <Field
        component={TextField}
        type="text"
        label={label}
        name={name}
        InputProps={{
          readOnly: true,
          value: '',
          startAdornment: <RemindersInputChips {...{reminders, removeReminder}} />,
          endAdornment: <RemindersInputButtons {...{reminders, clearReminders}} />,
          onClick: handleClick,
        }}
        fullWidth
      />
      <RemindersInputPopover {...{anchorEl, handleClose}} />
    </Box>
  );
};

export default RemindersInput;
