export type ReminderPeriodicity = 'once' | 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface Reminder {
  id: string;
  periodicity: ReminderPeriodicity;
  time: number;
  onceDate?: number;
  yearlyDate?: number;
  weekDays?: number[];
  monthDays?: number[];
}
