import {GradientColor} from '../shared/utils/color.utils';
import {User} from './user';
import {Item} from './item';

export interface Group {
  id: string;
  title: string;
  color: GradientColor;
  items?: Item[];
  users?: User[];
  notificationCount: number;
  messageCount: number;
}
