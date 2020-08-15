import {Group} from '../models/group';
import {User} from '../models/user';


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

const ITEM_TEMPLATE = {
  id: Math.random().toString(),
  type: 'todo',
  content: 'test',
  group: GROUP_BASE,
};

export const generateItem = () => {
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
