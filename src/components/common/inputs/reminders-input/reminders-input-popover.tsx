import React, {FC, useState} from 'react';
import {Box, Popover} from '@material-ui/core';
import {remindersInputPopoverStyles} from './_styles';
import {Reminder, ReminderPeriodicity} from '../../../../models/reminder';
import RemindersInputPopoverToolbar from './reminders-input-popover-toolbar';
import RemindersInputPopoverOnce from './reminders-input-popover-once';
import RemindersInputPopoverDaily from './reminders-input-popover-daily';
import RemindersInputPopoverWeekly from './reminders-input-popover-weekly';
import RemindersInputPopoverMonthly from './reminders-input-popover-monthly';
import RemindersInputPopoverYearly from './reminders-input-popover-yearly';

type Props = {
  anchorEl: HTMLElement;
  handleClose: (reminder: Reminder) => void;
};

const RemindersInputPopover: FC<Props> = ({anchorEl, handleClose}: Props) => {
  const classes = remindersInputPopoverStyles();
  const [reminder, setReminder] = useState<Reminder>(null);
  const [periodicity, setPeriodicity] = useState<ReminderPeriodicity>('once');

  const isOpen = Boolean(anchorEl);

  const onClose = (): void => {
    handleClose(reminder);
  };

  return (
    <Popover
      open={isOpen}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{vertical: 'top', horizontal: 'center'}}
      transformOrigin={{vertical: 'top', horizontal: 'center'}}
    >
      <RemindersInputPopoverToolbar periodicity={periodicity} setPeriodicity={setPeriodicity} />
      <Box className={classes.popoverBody}>
        {periodicity === 'once' && <RemindersInputPopoverOnce setReminder={setReminder} />}
        {periodicity === 'daily' && <RemindersInputPopoverDaily setReminder={setReminder} />}
        {periodicity === 'weekly' && <RemindersInputPopoverWeekly setReminder={setReminder} />}
        {periodicity === 'monthly' && <RemindersInputPopoverMonthly setReminder={setReminder} />}
        {periodicity === 'yearly' && <RemindersInputPopoverYearly setReminder={setReminder} />}
      </Box>
    </Popover>
  );
};

export default RemindersInputPopover;
