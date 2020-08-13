import {User} from '../../models/user';

type GradientColor = 'yellow';

export interface Group {
  id: string;
  title: string;
  color: GradientColor;
  items: GroupItem[];
  users: User[];
  notificationCount: number;
  messageCount: number;
}

export interface GroupItem {
  id: string;
  type: string;
  title: string;
}

export type GroupProps = {
  group: Group;
};
