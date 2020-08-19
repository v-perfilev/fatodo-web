import {Group} from './group';
import {User} from './user';
import {Reminder} from './reminder';

export type ItemType = 'task' | 'event' | 'repetition' | 'note';

export type ItemPriority = 'low' | 'normal' | 'high';

export interface Item {
  id: string;
  title: string;
  content: string;
  tags?: string[];
  type: ItemType;
  priority: ItemPriority;
  reminders?: Reminder[];
  createdBy: User;
  createdAt: string;
  updatedBy: User;
  updatedAt: string;
  group: Group;
}
