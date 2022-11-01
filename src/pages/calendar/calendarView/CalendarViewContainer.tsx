import React from 'React';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import PageContent from '../../../components/layouts/PageContent';
import CalendarViewHeader from './CalendarViewHeader';
import CalendarViewMonth from './CalendarViewMonth';
import {SxProps} from '@mui/material';
import CalendarSelectors from '../../../store/calendar/calendarSelectors';
import {CalendarItem, CalendarMonth} from '../../../models/Calendar';
import {useCallback, useEffect, useRef, useState} from 'react';
import {CalendarUtils} from '../../../shared/utils/CalendarUtils';
import {CalendarActions} from '../../../store/calendar/calendarActions';

type CalendarViewContainerProps = {
  toggleCollapsed?: () => void;
};

const months = CalendarUtils.generateAllCalendarMonths();
const monthKeys = months.map((r) => r.key);
const getInitialMonth = (): CalendarMonth => CalendarUtils.generateCurrentCalendarMonth();

const CalendarViewContainer = ({toggleCollapsed}: CalendarViewContainerProps) => {
  const dispatch = useAppDispatch();
  const shouldLoad = useAppSelector(CalendarSelectors.shouldLoad);
  const initialMonth = useRef<CalendarMonth>(getInitialMonth());
  const [activeMonth, setActiveMonth] = useState<CalendarMonth>(initialMonth.current);

  const selectMonth = useCallback((month: CalendarItem): void => {
    const key = CalendarUtils.buildMonthKey(month.year, month.month);
    const index = monthKeys.indexOf(key);
    if (index && index >= 0 && index < months.length) {
      const activeMonth = months[index];
      setActiveMonth(activeMonth);
    }
  }, []);

  useEffect(() => {
    dispatch(CalendarActions.handleMonthThunk(activeMonth));
  }, [activeMonth]);

  useEffect(() => {
    shouldLoad && dispatch(CalendarActions.handleMonthThunk(activeMonth));
  }, [shouldLoad]);

  return (
    <>
      <CalendarViewHeader month={activeMonth} selectMonth={selectMonth} toggleCollapsed={toggleCollapsed} />
      <PageContent sx={containerStyles} maxWidth="md">
        <CalendarViewMonth />
      </PageContent>
    </>
  );
};

const containerStyles: SxProps = {
  paddingY: 2,
};

export default CalendarViewContainer;
