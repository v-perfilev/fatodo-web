import React, {useCallback, useMemo} from 'react';
import {CalendarDate} from '../../../../models/Calendar';
import CalendarViewDateContainer from './CalendarViewDateContainer';
import CalendarSelectors from '../../../../store/calendar/calendarSelectors';
import {useAppSelector} from '../../../../store/store';
import CalendarViewReminders from '../calendarViewReminders/CalendarViewReminders';
import HoverPopup from '../../../../components/layouts/hoverPopup/HoverPopup';
import {CalendarUtils} from '../../../../shared/utils/CalendarUtils';

type CalendarViewDateProps = {
  activeMonthIndex: number;
  date: CalendarDate;
};

const CalendarViewDate = ({activeMonthIndex, date}: CalendarViewDateProps) => {
  const remindersSelector = useCallback(CalendarSelectors.makeRemindersSelector(), []);
  const monthKey = useMemo(() => CalendarUtils.buildMonthKeyByItem(date), [date]);
  const reminders = useAppSelector((state) => remindersSelector(state, monthKey, date.date));

  const calendarViewDate = <CalendarViewDateContainer {...{activeMonthIndex, date, reminders}} />;

  const calendarViewReminders = reminders.length ? <CalendarViewReminders reminders={reminders} /> : undefined;

  return <HoverPopup anchorElement={calendarViewDate} popupElement={calendarViewReminders} />;
};

export default CalendarViewDate;
