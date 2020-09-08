import {Reminder} from '../../../../models/reminder';
import React, {FC} from 'react';
import {IconButton} from '@material-ui/core';
import {PlusIcon} from '../../icons/plus-icon';
import {CloseIcon} from '../../icons/close-icon';

type Props = {
  reminders: Reminder[];
  addReminder: (event) => void;
  clearReminders: (event) => void;
};

const RemindersInputButtons: FC<Props> = ({reminders, addReminder, clearReminders}: Props) => {
  return (
    <>
      <IconButton size="small" onClick={addReminder}><PlusIcon /></IconButton>
      {reminders.length > 0 && (
        <IconButton size="small" onClick={clearReminders}><CloseIcon /></IconButton>
      )}
    </>
  );
};

export default RemindersInputButtons;
