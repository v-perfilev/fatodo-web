import React, {memo, useCallback, useMemo} from 'react';
import PageHeader from '../../../components/layouts/PageHeader';
import {useTranslation} from 'react-i18next';
import {IconButton, SxProps, Typography} from '@mui/material';
import BellIcon from '../../../components/icons/BellIcon';
import {CalendarItem, CalendarMonth} from '../../../models/Calendar';
import {useCalendarDialogContext} from '../../../shared/contexts/dialogContexts/CalendarDialogContext';
import {CalendarUtils} from '../../../shared/utils/CalendarUtils';
import {DateFormatters} from '../../../shared/utils/DateFormatters';
import FHStack from '../../../components/boxes/FHStack';
import ArrowDownIcon from '../../../components/icons/ArrowDownIcon';
import ActiveDateIcon from '../../../components/icons/ActiveDateIcon';
import ArrowLeftIcon from '../../../components/icons/ArrowLeftIcon';
import ArrowRightIcon from '../../../components/icons/ArrowRightIcon';
import {calendarMonthKeys, calendarMonths} from './CalendarViewContainer';

type GroupListHeaderProps = {
  month: CalendarMonth;
  selectMonth: (month: CalendarItem) => void;
  toggleCollapsed?: () => void;
};

const CalendarViewHeader = ({month, selectMonth, toggleCollapsed}: GroupListHeaderProps) => {
  const {showSelectMonthDialog} = useCalendarDialogContext();
  const {i18n} = useTranslation();

  const monthWithYear = useMemo(() => {
    const monthMoment = CalendarUtils.getMonthMoment(month.year, month.month);
    const monthWithYear = DateFormatters.formatDate(monthMoment.toDate(), undefined, undefined, 'MONTH_YEAR');
    return monthWithYear.toUpperCase();
  }, [month, i18n.language]);

  const isCurrentMonth = useMemo<boolean>(() => {
    const currentMonth = CalendarUtils.generateCurrentCalendarMonth();
    return currentMonth.key === month.key;
  }, [month]);

  const canGoToPreviousMonth = useMemo<boolean>(() => {
    const key = CalendarUtils.buildMonthKey(month.year, month.month);
    const index = calendarMonthKeys.indexOf(key);
    return index > 0;
  }, [month]);

  const canGoToNextMonth = useMemo<boolean>(() => {
    const key = CalendarUtils.buildMonthKey(month.year, month.month);
    const index = calendarMonthKeys.indexOf(key);
    return index >= 0 && index < calendarMonthKeys.length - 1;
  }, [month]);

  const handleMonthClick = useCallback((): void => {
    showSelectMonthDialog(month, selectMonth);
  }, [month]);

  const goToPreviousMonth = useCallback((): void => {
    const key = CalendarUtils.buildMonthKey(month.year, month.month);
    const index = calendarMonthKeys.indexOf(key);
    const activeMonth = calendarMonths[index - 1];
    selectMonth(activeMonth);
  }, [month]);

  const goToNextMonth = useCallback((): void => {
    const key = CalendarUtils.buildMonthKey(month.year, month.month);
    const index = calendarMonthKeys.indexOf(key);
    const activeMonth = calendarMonths[index + 1];
    selectMonth(activeMonth);
  }, [month]);

  const goToCurrentMonth = useCallback((): void => {
    const currentMonth = CalendarUtils.generateCurrentCalendarMonth();
    selectMonth(currentMonth);
  }, []);

  return (
    <PageHeader maxWidth="md">
      <FHStack>
        <IconButton color="primary" disabled={!canGoToPreviousMonth} onClick={goToPreviousMonth}>
          <ArrowLeftIcon />
        </IconButton>
        <FHStack sx={monthNameStyles} spacing={1} flexGrow={0} onClick={handleMonthClick}>
          <Typography fontSize={16} fontWeight="bold" color="primary">
            {monthWithYear}
          </Typography>
          <ArrowDownIcon color="primary" />
        </FHStack>
        <IconButton color="primary" disabled={!canGoToNextMonth} onClick={goToNextMonth}>
          <ArrowRightIcon />
        </IconButton>
      </FHStack>
      {toggleCollapsed && (
        <IconButton color="primary" onClick={toggleCollapsed}>
          <BellIcon />
        </IconButton>
      )}
      {!isCurrentMonth && (
        <IconButton color="primary" onClick={goToCurrentMonth}>
          <ActiveDateIcon />
        </IconButton>
      )}
    </PageHeader>
  );
};

const monthNameStyles: SxProps = {
  cursor: 'pointer',
};

export default memo(CalendarViewHeader);
