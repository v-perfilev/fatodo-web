import {ParamDate} from './param-date.model';

export type ReminderPeriodicity = 'once' | 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface Reminder {
  id?: string;
  periodicity: ReminderPeriodicity;
  date: ParamDate;
  weekDays?: number[];
  monthDates?: number[];
}
