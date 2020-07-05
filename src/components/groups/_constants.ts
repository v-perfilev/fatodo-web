import {Group} from './_types';

export const ITEMS_IN_GROUP_CARD = 5;
export const AVATARS_IN_GROUP_CARD = 5;

export const TEST_GROUP: Group = {
  id: Math.random(),
  title: 'Test Group',
  items: [
    {
      id: 0,
      type: 'todo',
      title: 'Recruiting blog post',
    },
    {
      id: 1,
      type: 'todo',
      title: 'Mobile app launch',
    },
    {
      id: 2,
      type: 'todo',
      title: 'Submit updates to mobile storefonts',
    },
    {
      id: 3,
      type: 'todo',
      title: 'Schedule meeting with Alex',
    },
    {
      id: 4,
      type: 'todo',
      title: 'Review editor calendar',
    },
    {
      id: 5,
      type: 'todo',
      title: 'Mobile app launch',
    },
    {
      id: 6,
      type: 'todo',
      title: 'Submit updates to mobile storefonts',
    },
    {
      id: 7,
      type: 'todo',
      title: 'Schedule meeting with Alex',
    },
    {
      id: 8,
      type: 'todo',
      title: 'Homepage refresh',
    },
    {
      id: 9,
      type: 'todo',
      title: 'Review editor calendar',
    },
    {
      id: 10,
      type: 'todo',
      title: 'Submit updates to mobile storefonts',
    },
    {
      id: 11,
      type: 'todo',
      title: 'Mobile app launch',
    },
    {
      id: 12,
      type: 'todo',
      title: 'Schedule meeting with Alex',
    },
    {
      id: 13,
      type: 'todo',
      title: 'Homepage refresh',
    },
    {
      id: 14,
      type: 'todo',
      title: 'Review editor calendar',
    },
    {
      id: 15,
      type: 'todo',
      title: 'Homepage refresh',
    },
  ],
  users: ['Vladimir', 'Maria', 'Eva', 'John', 'Michael', 'Bernd'],
  notificationCount: 3,
  messageCount: 11,
};
