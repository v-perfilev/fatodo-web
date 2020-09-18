import {Reminder} from '../../../../models/reminder.model';
import React, {FC, useEffect, useRef, useState} from 'react';
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
  const ref = useRef<any>();
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

  const inputLabelProps = reminders.length > 0 ? {} : {
    shrink: false,
  };

  const inputProps = reminders.length > 0 ? {
    readOnly: true,
    startAdornment: <RemindersInputChips {...{reminders, removeReminder}} />,
    endAdornment: <RemindersInputButtons {...{clearReminders}} />,
  } : {
    readOnly: true,
  };


  return (
    <Box className={classes.root}>
      <Field
        component={TextField}
        type="text"
        label={label}
        name={name}
        InputLabelProps={inputLabelProps}
        InputProps={inputProps}
        fullWidth
        onClick={handleClick}
      />
      <RemindersInputPopover {...{anchorEl, handleClose}} />
    </Box>
  );
};

export default RemindersInput;