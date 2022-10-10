import React, {HTMLAttributes} from 'react';
import {useTranslation} from 'react-i18next';
import {Box} from '@material-ui/core';
import {Reminder} from '../../models/reminder.model';
import {DateConverters, DateFormatters, DateUtils} from '../../shared/utils/date.utils';
import {flowRight} from 'lodash';
import withAuthState from '../../shared/hocs/with-auth-state/with-auth-state';
import {AuthState} from '../../store/rerducers/auth.reducer';

type ReminderViewProps = HTMLAttributes<HTMLElement> &
  AuthState & {
    reminder: Reminder;
  };

const ReminderView = ({reminder, className, account}: ReminderViewProps) => {
  const {t} = useTranslation();
  const timezone = account.info.timezone;

  //need to set locale in moment here cause of bug in material-ui
  DateUtils.resetLocale();

  const label = t('common:reminders.periodicity.' + reminder.periodicity) + ': ';

  const timeDate = DateConverters.getTimeFromParamDate(reminder.date, timezone);
  const dateDate = DateConverters.getDateFromParamDate(reminder.date, timezone);
  const time = DateFormatters.formatTime(timeDate);

  const buildOnceDescription = (): string => {
    const date = DateFormatters.formatDateWithYear(dateDate);
    return t('common:reminders.' + reminder.periodicity, {time, date});
  };

  const buildDailyDescription = (): string => {
    return t('common:reminders.' + reminder.periodicity, {time});
  };

  const buildWeeklyDescription = (): string => {
    const reminderWeekDays = DateConverters.getWeekDaysFromParamDate(reminder.date, reminder.weekDays, timezone);
    const weekDays = DateUtils.getDayNamesByNumbers(reminderWeekDays)
      .map((str) => str.toUpperCase())
      .join(', ');
    return t('common:reminders.' + reminder.periodicity, {time, weekDays});
  };

  const buildMonthlyDescription = (): string => {
    const reminderMonthDays = DateConverters.getMonthDaysFromParamDate(reminder.date, reminder.monthDays, timezone);
    const monthDates = reminderMonthDays.join(', ');
    return t('common:reminders.' + reminder.periodicity, {time, monthDates});
  };

  const buildYearlyDescription = (): string => {
    const date = DateFormatters.formatDate(dateDate);
    return t('common:reminders.' + reminder.periodicity, {time, date});
  };

  let description = '';
  if (reminder.periodicity === 'ONCE') {
    description = buildOnceDescription();
  } else if (reminder.periodicity === 'DAILY') {
    description = buildDailyDescription();
  } else if (reminder.periodicity === 'WEEKLY') {
    description = buildWeeklyDescription();
  } else if (reminder.periodicity === 'MONTHLY') {
    description = buildMonthlyDescription();
  } else if (reminder.periodicity === 'YEARLY') {
    description = buildYearlyDescription();
  }

  const reminderStr = label + description;
  return <Box className={className}>{reminderStr}</Box>;
};

export default flowRight([withAuthState])(ReminderView);
