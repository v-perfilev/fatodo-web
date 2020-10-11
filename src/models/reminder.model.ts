import {ParamDate} from './param-date.model';

export type ReminderPeriodicity = 'ONCE' | 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';

export interface Reminder {
  id?: string;
  periodicity: ReminderPeriodicity;
  date: ParamDate;
  weekDays?: number[];
  monthDays?: number[];
}
