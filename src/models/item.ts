import {Group} from './group';
import {Reminder} from './reminder';
import {AbstractAuditing} from './abstract-auditing';
import {ParamDate} from './param-date';

export const itemTypes: ItemType[] = ['task', 'event', 'repetition', 'note'];
export type ItemType = 'task' | 'event' | 'repetition' | 'note';

export const itemPriorities: ItemPriority[] = ['low', 'normal', 'high'];
export type ItemPriority = 'low' | 'normal' | 'high';

export interface Item extends AbstractAuditing {
  id: string;
  title: string;
  description?: string;
  type: ItemType;
  date?: ParamDate;
  priority: ItemPriority;
  reminders?: Reminder[];
  tags?: string[];
  group: Group;
}
