import {Reminder} from './reminder.model';
import {AbstractAuditing} from './abstract-auditing.model';
import {ParamDate} from './param-date.model';

export type ItemType = 'task' | 'event' | 'repetition' | 'note';
export type ItemPriority = 'low' | 'normal' | 'high';
export type ItemStatus = 'active' | 'closed';

export const itemTypes: ItemType[] = ['task', 'event', 'repetition', 'note'];
export const itemPriorities: ItemPriority[] = ['low', 'normal', 'high'];

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
