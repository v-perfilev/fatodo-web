import {ColorScheme} from '../shared/theme/colors';

export interface Group {
  id: string;
  title: string;
  color: ColorScheme;
  imageFilename: string;
  users?: GroupUser[];
  notificationCount: number;
  messageCount: number;
}

export interface GroupUser {
  id: string;
  permission: string;
}
