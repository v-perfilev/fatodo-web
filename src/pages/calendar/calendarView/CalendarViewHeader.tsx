import React, {memo, useCallback, useMemo} from 'react';
import PageHeader from '../../../components/layouts/PageHeader';
import {useTranslation} from 'react-i18next';
import {IconButton, SxProps, Typography, useMediaQuery} from '@mui/material';
import BellIcon from '../../../components/icons/BellIcon';
import {CalendarMonth} from '../../../models/Calendar';
import {useCalendarDialogContext} from '../../../shared/contexts/dialogContexts/CalendarDialogContext';
import {CalendarConstants, CalendarUtils} from '../../../shared/utils/CalendarUtils';
import {DateFormatters} from '../../../shared/utils/DateFormatters';
import FHStack from '../../../components/boxes/FHStack';
import ArrowDownIcon from '../../../components/icons/ArrowDownIcon';
import ActiveDateIcon from '../../../components/icons/ActiveDateIcon';
import ArrowLeftIcon from '../../../components/icons/ArrowLeftIcon';
import ArrowRightIcon from '../../../components/icons/ArrowRightIcon';
import {Theme} from '@mui/material/styles';

type GroupListHeaderProps = {
  activeMonthIndex: number;
  selectMonth: (month: CalendarMonth) => void;
  toggleCollapsed?: () => void;
};

const CalendarViewHeader = ({activeMonthIndex, selectMonth, toggleCollapsed}: GroupListHeaderProps) => {
  const isSmallDevice = useMediaQuery((theme: Theme) => theme.breakpoints.only('xs'));
  const {showSelectMonthDialog} = useCalendarDialogContext();
  const {i18n} = useTranslation();

  const month = useMemo<CalendarMonth>(() => {
    return CalendarUtils.getMonthByMonthIndex(activeMonthIndex);
  }, [activeMonthIndex]);

  const monthWithYear = useMemo<string>(() => {
    const monthDate = CalendarUtils.getMonthDate(month);
    const monthWithYear = DateFormatters.formatDate(
      monthDate,
      undefined,
      undefined,
      isSmallDevice ? 'MONTH_YEAR_SHORT' : 'MONTH_YEAR',
    );
    return monthWithYear.toUpperCase();
  }, [month, i18n.language]);

  const isCurrentMonth = useMemo<boolean>(() => {
    const currentMonth = CalendarUtils.getCurrentDate();
    return currentMonth.monthIndex === activeMonthIndex;
  }, [activeMonthIndex]);

  const canGoToPreviousMonth = useMemo<boolean>(() => {
    return activeMonthIndex > 0;
  }, [activeMonthIndex]);

  const canGoToNextMonth = useMemo<boolean>(() => {
    return activeMonthIndex < CalendarConstants.maxMonthIndex;
  }, [activeMonthIndex]);

  const handleMonthClick = useCallback((): void => {
    showSelectMonthDialog(month, selectMonth);
  }, [month]);

  const goToPreviousMonth = useCallback((): void => {
    const month = CalendarUtils.getMonthByMonthIndex(activeMonthIndex - 1);
    selectMonth(month);
  }, [activeMonthIndex]);

  const goToNextMonth = useCallback((): void => {
    const month = CalendarUtils.getMonthByMonthIndex(activeMonthIndex + 1);
    selectMonth(month);
  }, [activeMonthIndex]);

  const goToCurrentMonth = useCallback((): void => {
    const currentDate = CalendarUtils.getCurrentDate();
    selectMonth(currentDate);
  }, []);

  return (
    <PageHeader maxWidth="md">
      <FHStack sx={monthNameBoxStyles} spacing={1}>
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
      {!isCurrentMonth && (
        <IconButton color="primary" onClick={goToCurrentMonth}>
          <ActiveDateIcon />
        </IconButton>
      )}
      {toggleCollapsed && (
        <IconButton color="primary" onClick={toggleCollapsed}>
          <BellIcon />
        </IconButton>
      )}
    </PageHeader>
  );
};

const monthNameBoxStyles: SxProps = {
  marginLeft: -2,
};

const monthNameStyles: SxProps = {
  cursor: 'pointer',
};

export default memo(CalendarViewHeader);
