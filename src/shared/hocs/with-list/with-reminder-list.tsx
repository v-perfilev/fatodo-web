import {ReminderListContext} from '../../contexts/list-contexts/reminder-list-context';
import * as React from 'react';
import {ComponentType, FC, ReactElement, useState} from 'react';
import {useSnackContext} from '../../contexts/snack-context';
import {Reminder} from '../../../models/reminder.model';
import NotificationService from '../../../services/notification.service';

const withReminderList = (Component: ComponentType): FC => (props): ReactElement => {
  const {handleResponse} = useSnackContext();
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const load = (itemId: string): void => {
    setLoading(true);
    NotificationService.getAllByTargetId(itemId)
      .then((response) => {
        setReminders(response.data);
      })
      .catch((response) => {
        if (response.status !== 404) {
          handleResponse(response);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const context = {reminders, load, loading};

  return (
    <ReminderListContext.Provider value={context}>
      <Component {...props} />
    </ReminderListContext.Provider>
  );
};

export default withReminderList;
