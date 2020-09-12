import * as React from 'react';
import {FC, HTMLAttributes} from 'react';
import {useTranslation} from 'react-i18next';
import {Box} from '@material-ui/core';
import {Reminder} from '../../../models/reminder.model';
import {DateConverters, DateFormatters, DateUtils} from '../../../shared/utils/date.utils';

type Props = HTMLAttributes<any> & {
  reminder: Reminder;
};

const ReminderView: FC<Props> = ({reminder, className}: Props) => {
  const {t} = useTranslation();

  //need to set locale in moment here cause of bug in material-ui
  DateUtils.resetLocale();

  const label = t('items:reminder.periodicity.' + reminder.periodicity) + ': ';

  const timeDate = DateConverters.getTimeFromParamDate(reminder.date);
  const dateDate = DateConverters.getDateFromParamDate(reminder.date);
  const time = DateFormatters.formatTime(timeDate);

  let description = '';
  if (reminder.periodicity === 'once') {
    const date = DateFormatters.formatDateWithYear(dateDate);
    description = t('items:reminder.' + reminder.periodicity, {time, date});
  } else if (reminder.periodicity === 'daily') {
    description = t('items:reminder.' + reminder.periodicity, {time});
  } else if (reminder.periodicity === 'weekly') {
    const weekDays = DateUtils.getDayNamesByNumbers(reminder.weekDays)
      .map((str) => str.toUpperCase())
      .join(', ');
    description = t('items:reminder.' + reminder.periodicity, {time, weekDays});
  } else if (reminder.periodicity === 'monthly') {
    const monthDates = reminder.monthDates.join(', ');
    description = t('items:reminder.' + reminder.periodicity, {time, monthDates});
  } else if (reminder.periodicity === 'yearly') {
    const date = DateFormatters.formatDate(dateDate);
    description = t('items:reminder.' + reminder.periodicity, {time, date});
  }

  const reminderStr = label + description;
  return <Box className={className}>{reminderStr}</Box>;
};

export default ReminderView;
