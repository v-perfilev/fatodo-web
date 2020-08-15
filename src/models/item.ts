import {Group} from './group';

export interface Item {
  id: string;
  type: string;
  title: string;
  content: string;
  group: Group;
}
