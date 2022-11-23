import {CalendarReminder} from './Reminder';

export interface CalendarMonth {
  year: number;
  month: number;
  monthIndex?: number;
}

export interface CalendarDate extends CalendarMonth {
  date: number;
  reminders?: CalendarReminder[];
}
