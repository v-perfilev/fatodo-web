import React, {memo} from 'react';
import CalendarViewReminderItem from './CalendarViewReminderItem';
import FVStack from '../../../../components/boxes/FVStack';
import {CalendarReminder} from '../../../../models/Reminder';
import PageDivider from '../../../../components/layouts/PageDivider';

type CalendarViewRemindersProps = {
  reminders: CalendarReminder[];
};

const CalendarViewReminders = ({reminders}: CalendarViewRemindersProps) => {
  return (
    <FVStack spacing={0.5}>
      {reminders.map((reminder, index) => (
        <>
          {index !== 0 && <PageDivider />}
          <CalendarViewReminderItem reminder={reminder} key={index} />
        </>
      ))}
    </FVStack>
  );
};

export default memo(CalendarViewReminders);
