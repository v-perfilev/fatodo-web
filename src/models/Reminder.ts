import {DateParams} from './DateParams';

export type ReminderThreadType = 'ITEM';
export type ReminderPeriodicity = 'ONCE' | 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'YEARLY';

export interface ReminderInfo {
  groupId: string;
  itemId: string;
}

export interface Reminder {
  id?: string;
  periodicity: ReminderPeriodicity;
  date: DateParams;
  weekDays?: number[];
  monthDays?: number[];
}

export interface CalendarReminder {
  parentId: string;
  targetId: string;
  type: ReminderThreadType;
  periodicity: ReminderPeriodicity;
  date: number;
}
