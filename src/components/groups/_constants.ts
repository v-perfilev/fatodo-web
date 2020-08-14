import {Group} from '../../models/group';

export const CARD_HEADER_HEIGHT = 60;
export const CARD_RATIO = 1.5;

export const ITEMS_IN_GROUP_CARD = 5;
export const AVATARS_IN_GROUP_CARD = 5;

export const TEST_GROUP: Group = {
  id: Math.random().toString(),
  title: 'Test Group',
  color: 'yellow',
  items: [
    {
      id: Math.random().toString(),
      type: 'todo',
      title: 'Recruiting blog post',
    },
    {
      id: Math.random().toString(),
      type: 'todo',
      title: 'Mobile app launch',
    },
    {
      id: Math.random().toString(),
      type: 'todo',
      title: 'Submit updates to mobile storefonts',
    },
    {
      id: Math.random().toString(),
      type: 'todo',
      title: 'Schedule meeting with Alex',
    },
    {
      id: Math.random().toString(),
      type: 'todo',
      title: 'Review editor calendar',
    },
    {
      id: Math.random().toString(),
      type: 'todo',
      title: 'Mobile app launch',
    },
    {
      id: Math.random().toString(),
      type: 'todo',
      title: 'Submit updates to mobile storefonts',
    },
    {
      id: Math.random().toString(),
      type: 'todo',
      title: 'Schedule meeting with Alex',
    },
    {
      id: Math.random().toString(),
      type: 'todo',
      title: 'Homepage refresh',
    },
    {
      id: Math.random().toString(),
      type: 'todo',
      title: 'Review editor calendar',
    },
    {
      id: Math.random().toString(),
      type: 'todo',
      title: 'Submit updates to mobile storefonts',
    },
    {
      id: Math.random().toString(),
      type: 'todo',
      title: 'Mobile app launch',
    },
    {
      id: Math.random().toString(),
      type: 'todo',
      title: 'Schedule meeting with Alex',
    },
    {
      id: Math.random().toString(),
      type: 'todo',
      title: 'Homepage refresh',
    },
    {
      id: Math.random().toString(),
      type: 'todo',
      title: 'Review editor calendar',
    },
    {
      id: Math.random().toString(),
      type: 'todo',
      title: 'Homepage refresh',
    },
  ],
  users: [
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
  ],
  notificationCount: 3,
  messageCount: 11,
};
