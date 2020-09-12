import {GradientColor} from '../shared/utils/color.utils';
import {User} from './user.model';
import {ItemModel} from './item.model';

export interface Group {
  id: string;
  title: string;
  color: GradientColor;
  items?: ItemModel[];
  users?: User[];
  notificationCount: number;
  messageCount: number;
}
