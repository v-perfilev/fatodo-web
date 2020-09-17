import {GradientColor} from '../shared/utils/color.utils';
import {User} from './user.model';
import {Item} from './item.model';

export interface Group {
  id: string;
  title: string;
  color: GradientColor;
  imageFilename: string;
  items?: Item[];
  users?: User[];
  notificationCount: number;
  messageCount: number;
}
