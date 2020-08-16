import {Group} from './group';
import {User} from './user';

export type ItemType = 'task' | 'event' | 'repetition';

export type ItemPriority = 'low' | 'normal' | 'high';

export interface ItemReminder {
  id: string;
  date: string;
  time: string;
  repeat: string;
}

export interface Item {
  id: string;
  title: string;
  content: string;
  tags?: string[];
  type: ItemType;
  priority: ItemPriority;
  reminders?: ItemReminder[];
  createdBy: User;
  createdAt: string;
  updatedBy: User;
  updatedAt: string;
  group: Group;
}
