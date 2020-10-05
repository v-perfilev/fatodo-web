import React, {FC, useState} from 'react';
import {Box, Popover} from '@material-ui/core';
import {remindersInputPopoverStyles} from './_styles';
import {Reminder, ReminderPeriodicity} from '../../../../models/reminder.model';
import {RemindersInputPopoverToolbar} from './reminders-input-popover-toolbar';
import {RemindersInputPopoverOnce} from './reminders-input-popover-once';
import {RemindersInputPopoverDaily} from './reminders-input-popover-daily';
import {RemindersInputPopoverWeekly} from './reminders-input-popover-weekly';
import {RemindersInputPopoverMonthly} from './reminders-input-popover-monthly';
import {RemindersInputPopoverYearly} from './reminders-input-popover-yearly';

type Props = {
  anchorEl: HTMLElement;
  handleClose: (reminder: Reminder) => void;
};

export const RemindersInputPopover: FC<Props> = ({anchorEl, handleClose}: Props) => {
  const classes = remindersInputPopoverStyles();
  const [reminder, setReminder] = useState<Reminder>(null);
  const [periodicity, setPeriodicity] = useState<ReminderPeriodicity>('ONCE');

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
        {periodicity === 'ONCE' && <RemindersInputPopoverOnce setReminder={setReminder} />}
        {periodicity === 'DAILY' && <RemindersInputPopoverDaily setReminder={setReminder} />}
        {periodicity === 'WEEKLY' && <RemindersInputPopoverWeekly setReminder={setReminder} />}
        {periodicity === 'MONTHLY' && <RemindersInputPopoverMonthly setReminder={setReminder} />}
        {periodicity === 'YEARLY' && <RemindersInputPopoverYearly setReminder={setReminder} />}
      </Box>
    </Popover>
  );
};
