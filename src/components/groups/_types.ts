import {CSSProperties} from 'react';

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

export type Size = {
  width: number;
  height: number;
}

export const defaultSize: Readonly<Size> = {
  width: 0,
  height: 0,
};

export type GroupProps = {
  group: Group;
  mode: string;
  index: number;
  setCardWidth?: (width: number) => void;
}

export type GroupSpringProps = {
  heightSpring: CSSProperties;
  opacitySpring: CSSProperties;
}

export type SizeProps = {
  width: number;
  height: number;
}
