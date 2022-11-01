import React, {memo, useMemo} from 'react';
import {CalendarUtils} from '../../../shared/utils/CalendarUtils';
import {CalendarDate, CalendarMonth} from '../../../models/Calendar';
import {Box, SxProps} from '@mui/material';
import CalendarViewDate from './calendarViewDate/CalendarViewDate';

type CalendarViewMonthDatesProps = {
  month: CalendarMonth;
};

const CalendarViewMonthDates = ({month}: CalendarViewMonthDatesProps) => {
  const pageDates = useMemo<CalendarDate[]>(() => CalendarUtils.getOnePageDates(month.year, month.month), [month]);

  return (
    <Box sx={containerStyles}>
      {pageDates.map((date, index) => (
        <Box sx={boxStyles} key={index}>
          <CalendarViewDate month={month} date={date} />
        </Box>
      ))}
    </Box>
  );
};

const containerStyles: SxProps = {
  position: 'relative',
  display: 'flex',
  flexWrap: 'wrap',
  margin: '-2px',
};

const boxStyles: SxProps = {
  width: `calc(100% / 7)`,
  padding: '2px',
};

export default memo(CalendarViewMonthDates);
