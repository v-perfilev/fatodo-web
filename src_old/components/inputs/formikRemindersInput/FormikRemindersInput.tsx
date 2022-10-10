import {Reminder} from '../../../models/reminder.model';
import React, {useEffect, useState} from 'react';
import {Box} from '@material-ui/core';
import {Field, useFormikContext} from 'formik';
import {TextField} from 'formik-material-ui';
import RemindersInputPopover from './FormikRemindersInputPopover';
import {makeStyles} from '@material-ui/core/styles';
import FormikRemindersInputButtons from './FormikRemindersInputButtons';
import FormikRemindersInputChips from './FormikRemindersInputChips';

type FormikRemindersInputProps = {
  name: string;
  label: string;
};

const FormikRemindersInput = ({name, label}: FormikRemindersInputProps) => {
  const classes = formikRemindersInputStyles();
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

  const inputLabelProps =
    reminders.length > 0
      ? {}
      : {
          shrink: false,
        };

  const inputProps =
    reminders.length > 0
      ? {
          readOnly: true,
          startAdornment: <FormikRemindersInputChips {...{reminders, removeReminder}} />,
          endAdornment: <FormikRemindersInputButtons {...{clearReminders}} />,
        }
      : {
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

const formikRemindersInputStyles = makeStyles(() => ({
  root: {
    '& input': {
      flexShrink: 100,
    },
  },
}));

export default FormikRemindersInput;
