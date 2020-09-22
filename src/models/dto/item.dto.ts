import {ParamDate} from '../param-date.model';
import {Reminder} from '../reminder.model';

export interface ItemDTO {
  id: string,
  title: string,
  type: string,
  priority: string,
  date: ParamDate,
  description: string,
  reminders: Reminder[],
  tags: string[],
  groupId: string,
}
