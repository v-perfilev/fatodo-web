import React from 'React';
import {CalendarMonth} from '../../../models/Calendar';
import FVStack from '../../../components/boxes/FVStack';
import CalendarViewWeekDays from './CalendarViewWeekDays';
import CalendarViewMonthDates from './CalendarViewMonthDates';

type CalendarViewMonthProps = {
  month: CalendarMonth;
};

const CalendarViewMonth = ({month}: CalendarViewMonthProps) => {
  return (
    <FVStack spacing={1}>
      <CalendarViewWeekDays />
      <CalendarViewMonthDates month={month} />
    </FVStack>
  );
};

export default CalendarViewMonth;
