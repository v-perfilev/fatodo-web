import * as React from 'react';
import {useContext} from 'react';
import {Reminder} from '../../../models/reminder.model';

type ReminderListState = {
  reminders: Reminder[];
  load: (itemId: string) => void;
  loading: boolean;
};

export const ReminderListContext = React.createContext<ReminderListState>(null);
export const useReminderListContext = (): ReminderListState => useContext(ReminderListContext);
