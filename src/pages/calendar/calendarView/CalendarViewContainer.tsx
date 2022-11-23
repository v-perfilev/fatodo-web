import React, {useCallback, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import PageContent from '../../../components/layouts/PageContent';
import CalendarViewHeader from './CalendarViewHeader';
import CalendarViewMonth from './CalendarViewMonth';
import {SxProps} from '@mui/material';
import CalendarSelectors from '../../../store/calendar/calendarSelectors';
import {CalendarUtils} from '../../../shared/utils/CalendarUtils';
import {CalendarActions} from '../../../store/calendar/calendarActions';
import {CalendarMonth} from '../../../models/Calendar';

type CalendarViewContainerProps = {
  toggleCollapsed?: () => void;
};

const initialDate = CalendarUtils.getCurrentDate();

const CalendarViewContainer = ({toggleCollapsed}: CalendarViewContainerProps) => {
  const dispatch = useAppDispatch();
  const shouldLoad = useAppSelector(CalendarSelectors.shouldLoad);
  const [activeMonthIndex, setActiveMonthIndex] = useState<number>(initialDate.monthIndex);

  const selectMonth = useCallback((month: CalendarMonth): void => {
    const index = CalendarUtils.getMonthIndexByItem(month);
    setActiveMonthIndex(index);
  }, []);

  useEffect(() => {
    dispatch(CalendarActions.handleMonthThunk(activeMonthIndex));
  }, [activeMonthIndex]);

  useEffect(() => {
    shouldLoad && dispatch(CalendarActions.handleMonthThunk(activeMonthIndex));
  }, [shouldLoad]);

  return (
    <>
      <CalendarViewHeader
        activeMonthIndex={activeMonthIndex}
        selectMonth={selectMonth}
        toggleCollapsed={toggleCollapsed}
      />
      <PageContent sx={containerStyles} maxWidth="md">
        <CalendarViewMonth activeMonthIndex={activeMonthIndex} />
      </PageContent>
    </>
  );
};

const containerStyles: SxProps = {
  display: 'flex',
  flexGrow: 1,
  alignItems: 'center',
  paddingY: 2,
};

export default CalendarViewContainer;
