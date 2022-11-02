import React from 'react';
import {CalendarMonth} from '../../../models/Calendar';
import FVStack from '../../../components/boxes/FVStack';
import CalendarViewWeekDays from './CalendarViewWeekDays';
import CalendarViewMonthDates from './CalendarViewMonthDates';
import PageDivider from '../../../components/layouts/PageDivider';

type CalendarViewMonthProps = {
  month: CalendarMonth;
};

const CalendarViewMonth = ({month}: CalendarViewMonthProps) => {
  return (
    <FVStack spacing={1}>
      <CalendarViewWeekDays />
      <PageDivider />
      <CalendarViewMonthDates month={month} />
    </FVStack>
  );
};

export default CalendarViewMonth;
