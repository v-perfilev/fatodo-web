export interface Group {
  id: number;
  title: string;
  items: GroupItem[];
  users: string[];
  notificationCount: number;
  messageCount: number;
}

export interface GroupItem {
  id: number;
  type: string;
  title: string;
}

export type GroupProps = {
  group: Group;
};
