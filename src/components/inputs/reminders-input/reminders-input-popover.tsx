import React, {FC, useState} from 'react';
import {Box, Popover} from '@material-ui/core';
import {remindersInputPopoverStyles} from './_styles';
import {Reminder, ReminderPeriodicity} from '../../../models/reminder.model';
import {RemindersInputPopoverToolbar} from './reminders-input-popover-toolbar';
import {RemindersInputPopoverDaily} from './reminders-input-popover-daily';
import {RemindersInputPopoverWeekly} from './reminders-input-popover-weekly';
import {RemindersInputPopoverMonthly} from './reminders-input-popover-monthly';
import {RemindersInputPopoverYearly} from './reminders-input-popover-yearly';
import {RemindersInputPopoverOnce} from './reminders-input-popover-once';
import {flowRight} from 'lodash';
import withAuthState from '../../../shared/hocs/with-auth-state/with-auth-state';
import {AuthState} from '../../../store/rerducers/auth.reducer';

type Props = AuthState & {
  anchorEl: HTMLElement;
  handleClose: (reminder: Reminder) => void;
};

const RemindersInputPopover: FC<Props> = ({anchorEl, handleClose, account}: Props) => {
  const classes = remindersInputPopoverStyles();
  const [reminder, setReminder] = useState<Reminder>(null);
  const [periodicity, setPeriodicity] = useState<ReminderPeriodicity>('ONCE');
  const timezone = account.info.timezone;

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
        {periodicity === 'ONCE' && <RemindersInputPopoverOnce setReminder={setReminder} timezone={timezone} />}
        {periodicity === 'DAILY' && <RemindersInputPopoverDaily setReminder={setReminder} timezone={timezone} />}
        {periodicity === 'WEEKLY' && <RemindersInputPopoverWeekly setReminder={setReminder} timezone={timezone} />}
        {periodicity === 'MONTHLY' && <RemindersInputPopoverMonthly setReminder={setReminder} timezone={timezone} />}
        {periodicity === 'YEARLY' && <RemindersInputPopoverYearly setReminder={setReminder} timezone={timezone} />}
      </Box>
    </Popover>
  );
};

export default flowRight([withAuthState])(RemindersInputPopover);
