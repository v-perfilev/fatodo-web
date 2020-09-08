import React, {FC, useEffect, useState} from 'react';
import {Box, Popover} from '@material-ui/core';
import {remindersInputPopoverStyles} from './_styles';
import {Reminder, ReminderPeriodicity} from '../../../../models/reminder';
import RemindersInputPopoverToolbar from './reminders-input-popover-toolbar';
import RemindersInputPopoverOnce from './reminders-input-popover-once';

type Props = {
  reminder?: Reminder;
  anchorEl: HTMLElement;
  handleClose: () => void;
};

const RemindersInputPopover: FC<Props> = ({anchorEl, handleClose, reminder: oldReminder}: Props) => {
  const classes = remindersInputPopoverStyles();
  const [reminder, setReminder] = useState<Reminder>(null);
  const [periodicity, setPeriodicity] = useState<ReminderPeriodicity>('once');

  useEffect(() => {
    if (reminder) {
      setPeriodicity(oldReminder.periodicity);
    }
  }, []);

  const isOpen = Boolean(anchorEl);

  return (
    <Popover
      open={isOpen}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{vertical: 'center', horizontal: 'center'}}
      transformOrigin={{vertical: 'center', horizontal: 'center'}}
    >
      <RemindersInputPopoverToolbar periodicity={periodicity} setPeriodicity={setPeriodicity} />
      <Box className={classes.popoverBody}>
        {periodicity === 'once' && (
          <RemindersInputPopoverOnce reminder={reminder} setReminder={setReminder} />
        )}
      </Box>
    </Popover>
  );
};

export default RemindersInputPopover;
