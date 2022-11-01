import React, {memo, useCallback} from 'react';
import FVStack from '../../../../components/boxes/FVStack';
import FHStack from '../../../../components/boxes/FHStack';
import {CalendarDate, CalendarMonth} from '../../../../models/Calendar';
import {useAppSelector} from '../../../../store/store';
import CalendarSelectors from '../../../../store/calendar/calendarSelectors';
import {SxProps, Typography} from '@mui/material';
import CalendarViewDateReminders from './CalendarViewDateReminders';
import FBox from '../../../../components/boxes/FBox';

type CalendarViewDateProps = {
  month: CalendarMonth;
  date: CalendarDate;
};

const CalendarViewDate = ({month, date}: CalendarViewDateProps) => {
  const remindersSelector = useCallback(CalendarSelectors.makeRemindersSelector(), []);
  const reminders = useAppSelector((state) => remindersSelector(state, month.key, date.date));

  const handleClick = (): void => {
    date.isCurrentMonth && console.log(date);
  };

  const bg = date.isCurrentMonth ? 'grey.50' : 'grey.200';
  const color = 'grey.500';

  return (
    <FVStack sx={containerStyles(bg, date.isCurrentMonth)} onClick={handleClick}>
      <FHStack flexGrow={0} justifyContent="flex-end">
        <Typography fontSize="14" fontWeight="bold" color={color}>
          {date.date}
        </Typography>
      </FHStack>
      <FBox sx={remindersStyles}>
        <CalendarViewDateReminders reminders={reminders} />
      </FBox>
    </FVStack>
  );
};

const containerStyles = (backgroundColor: string, isCurrentMonth: boolean): SxProps => ({
  cursor: isCurrentMonth ? 'pointer' : 'default',

  padding: 2,
  borderRadius: 3,
  backgroundColor,
});

const remindersStyles: SxProps = {
  height: 50,
};

export default memo(CalendarViewDate);
