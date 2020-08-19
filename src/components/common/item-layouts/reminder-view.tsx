import * as React from 'react';
import {FC, HTMLAttributes} from 'react';
import {useTranslation} from 'react-i18next';
import {Box} from '@material-ui/core';
import {Reminder} from '../../../models/reminder';
import moment from 'moment';

type Props = HTMLAttributes<any> & {
  reminder: Reminder;
}

const getTime = (reminder: Reminder): Date => {
  const {time} = reminder;
  const date = new Date();
  date.setHours(Math.floor(time / 60));
  date.setMinutes(time % 60);
  return date;
};

const getDate = (reminder: Reminder): Date => {
  const {periodicity, day, month, year} = reminder;
  const date = new Date();
  if (periodicity === 'once') {
    date.setFullYear(year, month, day);
    date.setDate(day);
    date.setMonth(month);
  } else if (periodicity === 'yearly') {
    date.setDate(day);
    date.setMonth(month);
  }
  return date;
};


const ReminderView: FC<Props> = ({reminder, className}: Props) => {
  const {t} = useTranslation();

  const label = t('items:reminder.periodicity.' + reminder.periodicity) + ': ';

  const time = moment(getTime(reminder)).format("hh:mm");
  let description = '';
  if (reminder.periodicity === 'once') {
    const date = moment(getDate(reminder)).format("DD.MM.YYYY");
    description = t('items:reminder.' + reminder.periodicity, {time, date});
  } else if (reminder.periodicity === 'daily') {
    description = t('items:reminder.' + reminder.periodicity, {time});
  } else if (reminder.periodicity === 'weekly') {
    const weekdays = reminder.weekDays.join(', ');
    description = t('items:reminder.' + reminder.periodicity, {time, weekdays});
  } else if (reminder.periodicity === 'monthly') {
    const days = reminder.monthDays.map(d => t('items:reminder.weekdays.' + d)).join(', ');
    description = t('items:reminder.' + reminder.periodicity, {time, days});
  } else if (reminder.periodicity === 'yearly') {
    const date = moment(getDate(reminder)).format("DD.MM");
    description = t('items:reminder.' + reminder.periodicity, {time, date});
  }

  const string = label + description;
  return <Box className={className}>{string}</Box>;
};

export default ReminderView;
