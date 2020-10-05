import {Reminder} from './reminder.model';
import {AbstractAuditing} from './abstract-auditing.model';
import {ParamDate} from './param-date.model';

export type ItemType = 'TASK' | 'EVENT' | 'REPETITION' | 'NOTE';
export type ItemPriority = 'LOW' | 'NORMAL' | 'HIGH';
export type ItemStatus = 'ACTIVE' | 'CLOSED';

export const itemTypes: ItemType[] = ['TASK', 'EVENT', 'REPETITION', 'NOTE'];
export const itemPriorities: ItemPriority[] = ['LOW', 'NORMAL', 'HIGH'];

export interface Item extends AbstractAuditing {
  id: string;
  title: string;
  type: ItemType;
  priority: ItemPriority;
  date?: ParamDate;
  description?: string;
  reminders?: Reminder[];
  tags?: string[];
  status: ItemStatus;
  groupId: string;
}
