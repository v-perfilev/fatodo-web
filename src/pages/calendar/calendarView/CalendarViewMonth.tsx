import React from 'react';
import FVStack from '../../../components/boxes/FVStack';
import CalendarViewWeekDays from './CalendarViewWeekDays';
import CalendarViewMonthDates from './CalendarViewMonthDates';
import PageDivider from '../../../components/layouts/PageDivider';

type CalendarViewMonthProps = {
  activeMonthIndex: number;
};

const CalendarViewMonth = ({activeMonthIndex}: CalendarViewMonthProps) => {
  return (
    <FVStack spacing={1}>
      <CalendarViewWeekDays />
      <PageDivider />
      <CalendarViewMonthDates activeMonthIndex={activeMonthIndex} />
    </FVStack>
  );
};

export default CalendarViewMonth;
