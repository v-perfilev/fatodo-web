import {ColorScheme} from '../shared/utils/color-scheme.utils';
import {User} from './user.model';
import {Item} from './item.model';

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
