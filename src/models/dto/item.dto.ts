import {DateParams} from '../date-params.model';
import {Reminder} from '../reminder.model';

export interface ItemDTO {
  id: string;
  title: string;
  type: string;
  priority: string;
  date: DateParams;
  description: string;
  reminders: Reminder[];
  tags: string[];
  groupId: string;
}
