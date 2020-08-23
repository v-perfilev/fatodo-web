import {ParamDate} from './param-date';

export type ReminderPeriodicity = 'once' | 'daily' | 'weekly' | 'monthly' | 'yearly';

type Weekday = 'mo' | 'to' | 'we' | 'th' | 'fr' | 'sa' | 'su';

export interface Reminder {
  id: string;
  periodicity: ReminderPeriodicity;
  date: ParamDate;
  weekDays?: Weekday[];
  monthDays?: number[];
}
