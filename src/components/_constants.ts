import {Group} from '../models/group.model';
import {User} from '../models/user.model';
import {ItemModel} from '../models/item.model';
import {Reminder} from '../models/reminder.model';
import {ParamDate} from '../models/param-date.model';

const GROUP_BASE: Group = {
  id: Math.random().toString(),
  title: 'Test Group',
  color: 'yellow',
  notificationCount: 3,
  messageCount: 11,
};

const GROUP_USERS: User[] = [
  {
    id: Math.random().toString(),
    username: 'testUser1',
  },
  {
    id: Math.random().toString(),
    username: 'testUser2',
  },
  {
    id: Math.random().toString(),
    username: 'testUser3',
  },
  {
    id: Math.random().toString(),
    username: 'testUser4',
  },
  {
    id: Math.random().toString(),
    username: 'testUser5',
  },
];

const ITEM_TITLES: string[] = [
  'Recruiting blog post',
  'Mobile app launch',
  'Submit updates to mobile storefonts',
  'Schedule meeting with Alex',
  'Review editor calendar',
];

const LOREM_IPSUM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore ' +
  'magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo ' +
  'consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ' +
  'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const TEST_DATE: ParamDate = {
  time: 600,
  date: 15,
  month: 6,
  year: 2021,
};

export const TEST_REMINDER: Reminder = {
  id: '',
  periodicity: 'once',
  date: TEST_DATE,
};

const ITEM_TEMPLATE: ItemModel = {
  id: Math.random().toString(),
  title: '',
  description: LOREM_IPSUM,
  type: 'task',
  date: TEST_DATE,
  tags: ['test1', 'test2', 'test3'],
  priority: 'high',
  reminders: [TEST_REMINDER],
  createdBy: GROUP_USERS[0],
  createdAt: '01-01-2001',
  updatedBy: GROUP_USERS[0],
  updatedAt: '01-01-2001',
  group: GROUP_BASE,
};

export const generateItem = (): ItemModel => {
  const titleId = Math.floor(Math.random() * ITEM_TITLES.length);
  const title = ITEM_TITLES[titleId];

  return {
    ...ITEM_TEMPLATE,
    title,
  };
};

export const TEST_GROUP: Group = {
  ...GROUP_BASE,
  users: GROUP_USERS,
  items: Array.from(Array(10).keys()).map(() => {
    return generateItem();
  }),
};
