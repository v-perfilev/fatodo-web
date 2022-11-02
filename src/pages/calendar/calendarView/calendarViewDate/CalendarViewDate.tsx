import React, {useCallback} from 'react';
import {CalendarDate, CalendarMonth} from '../../../../models/Calendar';
import CalendarViewDateContainer from './CalendarViewDateContainer';
import CalendarSelectors from '../../../../store/calendar/calendarSelectors';
import {useAppSelector} from '../../../../store/store';
import CalendarViewReminders from '../calendarViewReminders/CalendarViewReminders';
import HoverPopup from '../../../../components/layouts/hoverPopup/HoverPopup';

type CalendarViewDateProps = {
  month: CalendarMonth;
  date: CalendarDate;
};

const CalendarViewDate = ({month, date}: CalendarViewDateProps) => {
  const remindersSelector = useCallback(CalendarSelectors.makeRemindersSelector(), []);
  const reminders = useAppSelector((state) => remindersSelector(state, month.key, date.date));

  const calendarViewDate = <CalendarViewDateContainer {...{month, date, reminders}} />;

  const calendarViewReminders = reminders.length ? <CalendarViewReminders reminders={reminders} /> : undefined;

  return <HoverPopup anchorElement={calendarViewDate} popupElement={calendarViewReminders} />;
};

export default CalendarViewDate;
