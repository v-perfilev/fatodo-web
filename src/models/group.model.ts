import {ColorScheme} from '../shared/theme/colors';
import {User} from './user.model';

export interface Group {
  id: string;
  title: string;
  color: ColorScheme;
  imageFilename: string;
  members: GroupMember[];
  notificationCount: number;
  messageCount: number;
}

export type GroupPermission = 'ADMIN' | 'EDIT' | 'READ';

export interface GroupMember {
  id: string;
  permission: GroupPermission;
}

export type GroupUser = GroupMember & User;
