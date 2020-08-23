import {Group} from './group';
import {Reminder} from './reminder';
import {AbstractAuditing} from './abstract-auditing';
import {ParamDate} from './param-date';

export type ItemType = 'task' | 'event' | 'repetition' | 'note';

export type ItemPriority = 'low' | 'normal' | 'high';

export interface Item extends AbstractAuditing {
  id: string;
  title: string;
  content: string;
  type: ItemType;
  date?: ParamDate;
  priority: ItemPriority;
  reminders?: Reminder[];
  tags?: string[];
  group: Group;
}
