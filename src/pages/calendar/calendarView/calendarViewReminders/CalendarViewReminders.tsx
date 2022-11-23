import React, {memo} from 'react';
import CalendarViewReminderItem from './CalendarViewReminderItem';
import FVStack from '../../../../components/boxes/FVStack';
import {CalendarReminder} from '../../../../models/Reminder';
import PageDivider from '../../../../components/layouts/PageDivider';
import {Box} from '@mui/material';

type CalendarViewRemindersProps = {
  reminders: CalendarReminder[];
};

const CalendarViewReminders = ({reminders}: CalendarViewRemindersProps) => {
  return (
    <FVStack spacing={0.5}>
      {reminders.map((reminder, index) => (
        <Box key={index}>
          {index !== 0 && <PageDivider marginY={1} />}
          <CalendarViewReminderItem reminder={reminder} />
        </Box>
      ))}
    </FVStack>
  );
};

export default memo(CalendarViewReminders);
