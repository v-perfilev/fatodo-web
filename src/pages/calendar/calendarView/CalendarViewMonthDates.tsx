import React, {memo, useMemo} from 'react';
import {CalendarUtils} from '../../../shared/utils/CalendarUtils';
import {CalendarDate, CalendarMonth} from '../../../models/Calendar';
import {Box, SxProps, useMediaQuery} from '@mui/material';
import CalendarViewDate from './calendarViewDate/CalendarViewDate';
import {Theme} from '@mui/material/styles';

type CalendarViewMonthDatesProps = {
  month: CalendarMonth;
};

const CalendarViewMonthDates = ({month}: CalendarViewMonthDatesProps) => {
  const isSmallDevice = useMediaQuery((theme: Theme) => theme.breakpoints.only('xs'));

  const pageDates = useMemo<CalendarDate[]>(() => CalendarUtils.getOnePageDates(month.year, month.month), [month]);

  return (
    <Box sx={containerStyles(isSmallDevice)}>
      {pageDates.map((date, index) => (
        <Box sx={boxStyles(isSmallDevice)} key={index}>
          <CalendarViewDate month={month} date={date} />
        </Box>
      ))}
    </Box>
  );
};

const containerStyles = (isSmallDevice: boolean): SxProps => ({
  position: 'relative',
  display: 'flex',
  flexWrap: 'wrap',
  margin: isSmallDevice ? -0.25 : -0.5,
});

const boxStyles = (isSmallDevice: boolean): SxProps => ({
  width: `calc(100% / 7)`,
  padding: isSmallDevice ? 0.25 : 0.5,
});

export default memo(CalendarViewMonthDates);
