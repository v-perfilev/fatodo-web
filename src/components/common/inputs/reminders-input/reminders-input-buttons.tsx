import {Reminder} from '../../../../models/reminder';
import React, {FC} from 'react';
import {IconButton} from '@material-ui/core';
import {CloseIcon} from '../../icons/close-icon';

type Props = {
  reminders: Reminder[];
  clearReminders: (event) => void;
};

const RemindersInputButtons: FC<Props> = ({reminders, clearReminders}: Props) => {
  return reminders.length > 0 && (
    <IconButton size="small" onClick={clearReminders}><CloseIcon /></IconButton>
  );
};

export default RemindersInputButtons;
