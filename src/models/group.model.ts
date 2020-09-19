import {User} from './user.model';
import {Item} from './item.model';
import {ColorScheme} from '../shared/theme/colors';

export interface Group {
  id: string;
  title: string;
  color: ColorScheme;
  imageFilename: string;
  items?: Item[];
  users?: User[];
  notificationCount: number;
  messageCount: number;
}
