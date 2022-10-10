import {DateParams} from './date-params.model';

export type ReminderPeriodicity = 'ONCE' | 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';

export interface Reminder {
  id?: string;
  periodicity: ReminderPeriodicity;
  date: DateParams;
  weekDays?: number[];
  monthDays?: number[];
}
