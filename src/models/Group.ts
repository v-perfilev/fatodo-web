import {User} from './User';
import {ColorScheme} from '../shared/themes/colors';

export interface GroupInfo {
  id: string;
  title: string;
  color: ColorScheme;
}

export interface Group {
  id: string;
  title: string;
  color: ColorScheme;
  imageFilename: string;
  members: GroupMember[];
}

export type GroupPermission = 'ADMIN' | 'EDIT' | 'READ';

export interface GroupMember {
  groupId: string;
  userId: string;
  permission: GroupPermission;
}

export type GroupUser = GroupMember & User;
