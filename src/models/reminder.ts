export type ReminderPeriodicity = 'once' | 'daily' | 'weekly' | 'monthly' | 'yearly';

type Weekday = 'mo' | 'to' | 'we' | 'th' | 'fr' | 'sa' | 'su';

export interface Reminder {
  id: string;
  periodicity: ReminderPeriodicity;
  time: number;
  day?: number;
  month?: number;
  year?: number;
  weekDays?: Weekday[];
  monthDays?: number[];
}
